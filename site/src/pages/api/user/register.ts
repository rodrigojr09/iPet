import prisma from "@/utils/prisma";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { IncomingForm, File } from "formidable";
import fs from "fs";

export const config = {
	api: {
		bodyParser: false,
	},
};

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_KEY!
);

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const form = new IncomingForm({ keepExtensions: true });

	form.parse(req, async (err, fields, files) => {
		if (err) {
			console.error("Error parsing form:", err);
			return res.status(400).json({ error: "Form parsing error" });
		}

		const email = fields.email?.toString();
		const senha = fields.senha?.toString();
		const nome = fields.nome?.toString();
		const nascimento = fields.nascimento?.toString();
		const raca = fields.raca?.toString();
		const tag = fields.tag?.toString();
		const fotoField = files.foto;
		const foto = (
			Array.isArray(fotoField) ? fotoField[0] : fotoField
		) as File;

		if (
			!email ||
			!senha ||
			!nome ||
			!nascimento ||
			!raca ||
			!foto ||
			!tag
		) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		try {
			const existingUser = await prisma.account.findUnique({
				where: { email },
			});
			if (existingUser) {
				return res.status(409).json({ error: "Email already in use" });
			}

			const existingTag = await prisma.profile.findUnique({
				where: { tag },
			});
			if (existingTag) {
				return res.status(409).json({ error: "Tag already in use" });
			}

			const hashedSenha = await bcrypt.hash(senha, 10);

			const user = await prisma.account.create({
				data: {
					id: uuidv4(),
					email,
					senha: hashedSenha,
					role: "user",
				},
			});

			if (!user) {
				return res.status(500).json({ error: "Error creating user" });
			}

			const fileBuffer = await fs.promises.readFile(foto.filepath);
			const storagePath = `${user.id}-${foto.originalFilename}`;
			const { error: uploadError } = await supabase.storage
				.from("avatars")
				.upload(storagePath, fileBuffer, {
					contentType: foto.mimetype || "image/jpeg",
					upsert: true,
				});

			if (uploadError) {
				console.error("Upload error:", uploadError);
				return res
					.status(500)
					.json({ error: "Failed to upload image" });
			}

			const { data } = supabase.storage
				.from("avatars")
				.getPublicUrl(storagePath);
			console.log(data);
			const fotoUrl = data.publicUrl || "";

			const profileCreated = await prisma.profile.create({
				data: {
					id: uuidv4(),
					tag,
					account_id: user.id,
					nome,
					nascimento,
					raca,
					bio: "",
					foto: fotoUrl,
				},
			});

			const { senha: _, ...userWithoutSenha } = user;
			return res
				.status(201)
				.json({ user: userWithoutSenha, profile: profileCreated });
		} catch (error) {
			console.error("Error creating account/profile:", error);
			return res.status(500).json({ error: "Internal server error" });
		}
	});
}

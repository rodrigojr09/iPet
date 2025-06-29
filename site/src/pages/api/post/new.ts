import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import { v4 as uuidv4 } from "uuid";
import { IncomingForm, File } from "formidable";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

export const config = {
	api: {
		bodyParser: false,
	},
};

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_KEY!
);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Método não permitido" });
	}

	const form = new IncomingForm({ keepExtensions: true });

	form.parse(req, async (err, fields, files) => {
		if (err) {
			console.error("Erro ao analisar o formulário:", err);
			return res.status(400).json({ error: "Erro ao analisar os dados" });
		}

		const titulo = fields.titulo?.toString() || "";
		const legenda = fields.legenda?.toString() || "";
		const authorId = fields.authorId?.toString();

		if (!authorId) {
			return res.status(400).json({ error: "ID do autor é obrigatório" });
		}

		const imagemField = files.foto;
		const imagem = (
			Array.isArray(imagemField) ? imagemField[0] : imagemField
		) as File;

		let imageUrl: string | null = null;

		// Upload para Supabase se imagem for fornecida
		if (imagem) {
			try {
				const buffer = await fs.promises.readFile(imagem.filepath);
				const storagePath = `${uuidv4()}-${imagem.originalFilename}`;
				const { error: uploadError } = await supabase.storage
					.from("posts")
					.upload(storagePath, buffer, {
						contentType: imagem.mimetype || "image/jpeg",
						upsert: true,
					});

				if (uploadError) {
					console.error(
						"Erro ao fazer upload no Supabase:",
						uploadError
					);
					return res
						.status(500)
						.json({ error: "Erro ao salvar a imagem" });
				}

				const { data } = supabase.storage
					.from("posts")
					.getPublicUrl(storagePath);
				imageUrl = data.publicUrl;
			} catch (err) {
				console.error("Erro ao processar imagem:", err);
				return res
					.status(500)
					.json({ error: "Erro ao processar imagem" });
			}
		} else {
			console.error("Erro ao processar imagem:", err);
			return res.status(500).json({ error: "Erro ao processar imagem" });
		}

		try {
			const createdPost = await prisma.post.create({
				data: {
					id: uuidv4(),
					titulo,
					legenda,
					imageUrl: imageUrl || null,
					authorId,
					likes: [],
				},
			});

			return res.status(201).json({ post: createdPost });
		} catch (error) {
			console.error("Erro ao criar post:", error);
			return res
				.status(500)
				.json({ error: "Erro interno ao criar o post" });
		}
	});
}

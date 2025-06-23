import prisma from "@/utils/prisma";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

interface Profile {
	nome: string;
	nascimento: string;
	raca: string;
}

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { email, senha, profile } = req.body as {
        email?: string;
        senha?: string;
        profile?: Profile;
    };

	if (!email || !senha || !profile) {
		return res.status(400).json({
			error: "Missing required fields: email, senha, or profile",
		});
	}

	try {
		// Verifica se o e-mail já está em uso
		const existingUser = await prisma.account.findUnique({
			where: { email },
		});

		if (existingUser) {
			return res.status(409).json({ error: "Email already in use" });
		}

		// Gera hash da senha
		const hashedSenha = await bcrypt.hash(senha, 10);

		// Cria conta
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
		
		const profileCreated = await prisma.profile.create({
			data: {
				id: uuidv4(),
                account_id: user?.id,
                ...profile,
                bio: "",
                foto: "",
			},
		});

		// Remove senha da resposta
		const { senha: _, ...userWithoutsenha } = user;

		return res
			.status(201)
			.json({ user: userWithoutsenha, profile: profileCreated });
	} catch (error) {
		console.error("Error creating account/profile:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}

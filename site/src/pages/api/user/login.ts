import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ error: "Email and password are required." });
	}

	try {
		const user = await prisma.account.findUnique({
			where: { email },
		});

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials." });
		}

		const passwordMatch = await bcrypt.compare(password, user.senha);

		if (!passwordMatch) {
			return res.status(401).json({ error: "Invalid credentials." });
		}

		// Opcional: omitir senha da resposta
		const { senha, ...userWithoutPassword } = user;

		return res.status(200).json(userWithoutPassword);
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}

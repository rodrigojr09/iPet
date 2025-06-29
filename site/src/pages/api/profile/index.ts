import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const profiles = await prisma.profile.findMany();
		return res.status(200).json(profiles);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Internal server error" });
	}
}

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
		const posts = await prisma.post.findMany({
			include: {
				author:
					req.body.author && req.body.author === "true"
						? true
						: false,
			},
		});
		return res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Internal server error" });
	}
}

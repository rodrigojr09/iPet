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
		const profile = await prisma.profile.findFirst({
			where: { tag: req.query.tag as string },
			include: {
				posts: {
					include: {
						author: true,
						comments: true,
					},
				},
			},
		});
		if (profile === null)
			return res.status(404).json({ error: "Profile not found" });

		return res.status(200).json(profile);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Internal server error" });
	}
}

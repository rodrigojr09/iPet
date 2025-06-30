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

	const { id, profile_id } = req.query;

	if (!id || !profile_id) {
		return res
			.status(400)
			.json({ error: "ID and profile ID are required" });
	}

	try {
		const profile = await prisma.profile.findUnique({
			where: { id: id as string },
		});

		if (!profile) {
			return res.status(404).json({ error: "Profile not found" });
		}

		await prisma.profile.update({
			where: { id: id as string },
			data: {
				followers: { push: profile_id as string },
				notifications: {
					push: {
						message: `${profile.nome} seguiu você!`,
						type: "follow",
						data: {
							profile_id: profile_id,
						},
					},
				},
			},
		});

		return res
			.status(200)
			.json({ message: "Profile followed successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Internal server error" });
	}
}

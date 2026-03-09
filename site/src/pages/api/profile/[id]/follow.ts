import prisma from "@/utils/prisma";
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
		const [targetProfile, actorProfile] = await Promise.all([
			prisma.profile.findUnique({
				where: { id: id as string },
			}),
			prisma.profile.findUnique({
				where: { id: profile_id as string },
			}),
		]);

		if (!targetProfile || !actorProfile) {
			return res.status(404).json({ error: "Profile not found" });
		}

		if (targetProfile.id === actorProfile.id) {
			return res.status(400).json({ error: "Cannot follow yourself" });
		}

		if (targetProfile.followers.includes(actorProfile.id)) {
			return res.status(409).json({ error: "Already following profile" });
		}

		await Promise.all([
			prisma.profile.update({
				where: { id: targetProfile.id },
				data: {
					followers: { push: actorProfile.id },
					notifications: {
						push: {
							message: `${actorProfile.nome} seguiu voce!`,
							type: "follow",
							data: {
								profile_id: actorProfile.id,
							},
						},
					},
				},
			}),
			prisma.profile.update({
				where: { id: actorProfile.id },
				data: {
					following: { push: targetProfile.id },
				},
			}),
		]);

		return res
			.status(200)
			.json({ message: "Profile followed successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Internal server error" });
	}
}

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

		if (!targetProfile.followers.includes(actorProfile.id)) {
			return res.status(409).json({ error: "Profile is not followed" });
		}

		await Promise.all([
			prisma.profile.update({
				where: { id: targetProfile.id },
				data: {
					followers: {
						set: targetProfile.followers.filter(
							(followerId: string) =>
								followerId !== actorProfile.id
						),
					},
					notifications: {
						set: targetProfile.notifications.filter(
							(notification: (typeof targetProfile.notifications)[number]) =>
								notification.type !== "follow" ||
								(notification.data as { profile_id?: string })
									?.profile_id !== actorProfile.id
						),
					},
				},
			}),
			prisma.profile.update({
				where: { id: actorProfile.id },
				data: {
					following: {
						set: actorProfile.following.filter(
							(followingId: string) =>
								followingId !== targetProfile.id
						),
					},
				},
			}),
		]);

		return res
			.status(200)
			.json({ message: "Profile unfollowed successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Internal server error" });
	}
}

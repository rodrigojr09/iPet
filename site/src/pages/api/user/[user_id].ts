import prisma from "@/utils/prisma";
import { handleApiError } from "@/utils/apiError";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { user_id } = req.query;

	if (!user_id) {
		return res.status(400).json({ error: "User ID is required" });
	}

	try {
		const user = await prisma.account.findUnique({
			where: { id: user_id as string },
			include: {
				profiles: req.query.profiles === "true",
			},
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.status(200).json(user);
	} catch (err) {
		return handleApiError(res, err);
	}
}

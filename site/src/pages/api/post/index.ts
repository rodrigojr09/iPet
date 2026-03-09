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

	try {
		const posts = await prisma.post.findMany({
			include: {
				author: true,
				comments: true,
			},
		});
		return res.status(200).json(posts);
	} catch (err) {
		return handleApiError(res, err);
	}
}

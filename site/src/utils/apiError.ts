import { NextApiResponse } from "next";

type MaybePrismaError = {
	name?: string;
	code?: string;
	message?: string;
};

export function handleApiError(
	res: NextApiResponse,
	error: unknown,
	defaultMessage = "Internal server error"
) {
	const prismaError = error as MaybePrismaError;

	if (prismaError?.name === "PrismaClientInitializationError") {
		console.error("Database initialization error:", error);
		return res.status(503).json({
			error: "Database connection unavailable. Check DATABASE_URL and network access.",
		});
	}

	if (prismaError?.name === "PrismaClientKnownRequestError") {
		console.error("Prisma request error:", error);
		return res.status(400).json({ error: defaultMessage });
	}

	console.error(defaultMessage, error);
	return res.status(500).json({ error: defaultMessage });
}

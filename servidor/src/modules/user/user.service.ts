import { prisma } from "../../lib/prisma";
import { UsersSelect, UsersWhere } from "./user.types";

async function getUsers({
	where,
	select,
}: {
	where?: UsersWhere;
	select?: UsersSelect;
}) {
	const users = await prisma.user.findMany({
		where,
		select,
	});
	return users;
}

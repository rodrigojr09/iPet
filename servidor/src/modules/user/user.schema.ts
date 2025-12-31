import { Role } from "@prisma/client";
import { UsersWhere } from "./user.types";
import { z } from "zod";

export const getAllUsersQuerySchema = z.object({
	name: { type: "string" },
	email: z.string().email().optional(), // email válido ou vazio
    role: z.enum(Role).optional(), // só aceita ADMIN ou USER
    phone: z.string().optional(),
} as UsersWhere);

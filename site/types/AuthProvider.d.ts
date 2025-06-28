import { Account, Prisma, Profile } from "@prisma/client";
export interface AuthProps {
	account?: Prisma.AccountGetPayload<{ include: { profiles: true } }> | null;
	profile?: Profile;
	logout: () => void;
    enter: (profile_id: string) => void;
    status: boolean;
}

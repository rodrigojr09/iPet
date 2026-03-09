import { AccountModel, ProfileModel } from "@/types/models";
export interface AuthProps {
	account?: AccountModel | null;
	profile?: ProfileModel;
	logout: () => void;
    enter: (profile_id: string) => void;
    status: boolean;
}

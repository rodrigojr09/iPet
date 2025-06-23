import { Account } from ".";

export interface AuthProps {
	account?: Account;
	profile?: Profile;
	logout: () => void;
	register: (account: Account) => void;
	enter: (profile_id: string) => void;
}

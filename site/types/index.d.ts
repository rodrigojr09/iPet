export interface Account {
	id: string;
	email: string;
    senha: string;
    role: AccountRole;
	profiles?: Profile[];
}

export interface Profile {
	id: string;
	nome: string;
	idade: number;
	foto: string;
	bio: string;
	raca: string;
	account_id: string;
	account?: Account;
}

export type AccountRole = "admin" | "user";

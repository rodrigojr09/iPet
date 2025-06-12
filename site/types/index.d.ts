export interface Account {
	id: string;
    nome: string;
    avatar: string;
	bio: string;
	pet: AccountPet;
	auth: AccountAuth;
	role: AccountRole;
}

export interface AccountAuth {
	email: string;
	senha: string;
}

export interface AccountPet {
	id: string;
	nome: string;
	idade: number;
	foto: string;
	bio: string;
	raca: string;
}

export type AccountRole = "admin" | "user";
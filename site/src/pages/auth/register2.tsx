export interface AccountProps {
	email: string;
	senha: string;
	confirmarSenha?: string;
}

export interface ProfileProps {
	tag: string;
	nome: string;
	nascimento: string;
	raca: string;
	foto: File | null;
}

export { default } from "./register";

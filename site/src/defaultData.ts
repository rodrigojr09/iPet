import { v4 as uuidv4 } from "uuid";
import type { Account } from "../types";

export const account: Account = {
	id: uuidv4(),
	nome: "Rodrigo",
	avatar: "https://avatars.githubusercontent.com/u/165495511?v=4",
	bio: "O melhor programador do mundo",
	auth: {
		email: "rodrigo.macia019@gmail.com",
		senha: "",
	},
	pet: {
		id: uuidv4(),
		nome: "Mufasa",
		idade: 2,
		raca: "Gato",
		foto: "https://adotar.com.br/upload/2024-08/animais_imagem1142401.jpg?w=700&format=webp",
		bio: "O melhor gato do mundo",
	},
	role: "admin",
};

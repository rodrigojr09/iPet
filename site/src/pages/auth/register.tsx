import MRInput from "@/components/ui/MRInput";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

interface Error {
	message: string;
	type: "Geral" | string;
}

export default function RegisterPage() {
	const [error, setError] = useState<Error | null>(null);

	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validação de senha
		if (password !== confirmPassword) {
			setError({ type: "password", message: "As senhas não são iguais" });
			return;
		}

		// Limpa erro
		setError(null);

		try {
			const res = await axios.post("/api/auth/register", {
				nome,
				email,
				password,
			});
			console.log(res);
		} catch (err) {
			console.error(err);
			setError({
				type: "Geral",
				message: "Erro ao criar conta. Tente novamente.",
			});
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-indigo-700 text-white">
			<div className="w-full max-w-md bg-indigo-900 p-8 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-center mb-6">
					Criar Conta no iPet
				</h1>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<MRInput
						label="Nome"
						placeholder="Digite seu nome"
						value={nome}
						setValue={setNome}
						error={
							error?.type === "nome" ? error.message : undefined
						}
					/>

					<MRInput
						label="Email"
						placeholder="Digite seu Email"
						type="email"
						value={email}
						setValue={setEmail}
						error={
							error?.type === "email" ? error.message : undefined
						}
					/>

					<MRInput
						label="Senha"
						placeholder="Crie uma senha"
						type="password"
						value={password}
						setValue={setPassword}
						error={
							error?.type === "password"
								? error.message
								: undefined
						}
					/>

					<MRInput
						label="Confirmar Senha"
						placeholder="Confirme sua senha"
						type="password"
						value={confirmPassword}
						setValue={setConfirmPassword}
						error={
							error?.type === "password"
								? error.message
								: undefined
						}
					/>

					<button
						type="submit"
						className="w-full bg-pink-600 hover:bg-pink-700 transition-all py-3 rounded-lg text-lg font-semibold"
					>
						Criar Conta
					</button>
				</form>

				{/* Exibição de erro geral */}
				{error?.type === "Geral" && (
					<p className="text-red-400 text-sm mt-2 text-center">
						{error.message}
					</p>
				)}

				<div className="text-center mt-4 text-sm">
					Já tem uma conta?{" "}
					<Link
						href="/auth/login"
						className="text-pink-400 font-semibold hover:underline"
					>
						Entre aqui
					</Link>
				</div>
			</div>
		</div>
	);
}

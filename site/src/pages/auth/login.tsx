import MRButton from "@/components/ui/MRButton";
import MRCard from "@/components/ui/MRCard";
import MRInput from "@/components/ui/MRInput";
import Link from "next/link";
import { useState } from "react";

interface Error {
	message: string;
	type: "Geral" | string;
}

export default function LoginPage() {
	const [error, setError] = useState<Error | null>(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="flex items-center justify-center h-screen bg-indigo-700 text-white">
			<MRCard>
				<h1 className="text-3xl font-bold text-center mb-6">
					Entrar no iPet
				</h1>
				<form
					className="space-y-4"
					onSubmit={(e) => e.preventDefault()}
				>
					<MRInput
						label="Email"
						setValue={setEmail}
						value={email}
						type="email"
						id="email"
						placeholder="Digite seu email"
						error={error?.type === "email" ? error?.message : undefined}
					/>
					<MRInput
						label="Senha"
						setValue={setPassword}
						value={password}
						type="password"
						id="password"
						placeholder="Digite sua senha"
						error={error?.type === "password" ? error?.message : undefined}
					/>
					<MRButton type="submit">Entrar</MRButton>
				</form>
				<div className="text-center mt-4 text-sm">
					<Link
						href="/auth/recovery"
						className="text-pink-400 hover:underline"
					>
						Esqueceu sua senha?
					</Link>
				</div>
				<div className="text-center mt-2 text-sm">
					Não tem uma conta?{" "}
					<Link
						href="/auth/register"
						className="text-pink-400 font-semibold hover:underline"
					>
						Crie uma agora
					</Link>
				</div>
			</MRCard>
		</div>
	);
}

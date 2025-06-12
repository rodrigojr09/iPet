"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [erro, setErro] = useState("");

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();
		const res = await signIn("credentials", {
			redirect: false,
			email,
			senha,
		});

		if (res?.ok) {
			router.push("/feed");
		} else {
			setErro("Email ou senha incorretos.");
		}
	}

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
			<Navbar isAuth={false} />
			<main className="p-6 flex justify-center items-start mt-10">
				<section className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md w-full">
					<h2 className="text-2xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">
						Entrar no iPet 🐶
					</h2>

					{erro && (
						<p className="text-red-500 text-sm mb-4 text-center">
							{erro}
						</p>
					)}

					<form onSubmit={handleLogin} className="space-y-4">
						<div>
							<label className="text-sm block mb-1">Email</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
								required
							/>
						</div>

						<div>
							<label className="text-sm block mb-1">Senha</label>
							<input
								type="password"
								value={senha}
								onChange={(e) => setSenha(e.target.value)}
								className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
								required
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
						>
							Entrar
						</button>

						<p className="text-center text-sm mt-4">
							Ainda não tem conta?{" "}
							<a
								href="/register"
								className="text-blue-500 hover:underline"
							>
								Cadastre-se
							</a>
						</p>
					</form>
				</section>
			</main>
		</div>
	);
}

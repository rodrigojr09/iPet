import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { useError } from "@/hooks/useError";

export default function LoginPage() {
	const error = useError();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!email.trim() || !password) {
			error.throwError("Preencha email e senha.");
			return;
		}

		try {
			setLoading(true);
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
				callbackUrl: "/",
			});

			if (result?.error) {
				error.throwError("Email ou senha invalidos.");
				return;
			}

			if (result?.url) {
				window.location.href = result.url;
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Head>
				<title>iPet - Login</title>
			</Head>

			<div className="min-h-screen bg-[#f7f1eb] px-4 py-8">
				<div className="mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-[#d8c9bc] bg-[linear-gradient(180deg,#fffdf9_0%,#f7efe6_100%)] shadow-[0_20px_60px_rgba(92,64,42,0.12)] md:grid md:grid-cols-[0.95fr_1.05fr]">
					<aside className="relative min-h-[280px] bg-[linear-gradient(180deg,#f5d8c5_0%,#fde7d6_100%)] p-8 md:p-10">
						<div className="absolute inset-0 bg-[url('/auth-bg-texture.svg')] opacity-30" />
						<div className="relative flex h-full flex-col justify-between">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9b7b65]">
									Bem-vindo de volta
								</p>
								<h1 className="mt-3 text-3xl font-black text-[#4b382d]">
									Entre para acompanhar o feed do seu pet.
								</h1>
								<p className="mt-4 text-sm leading-6 text-[#6e5748]">
									Acesse sua conta, publique fotos e acompanhe outros
									perfis da comunidade iPet.
								</p>
							</div>

							<div className="mt-8 flex items-end justify-center gap-4">
								<div className="relative h-40 w-40 overflow-hidden rounded-[28px] border border-[#e8c9b7] bg-white/80 shadow-lg">
									<Image
										src="/cute-dog.svg"
										alt="Ilustracao de cachorro"
										fill
										className="object-contain p-4"
									/>
								</div>
								<div className="relative h-28 w-28">
									<Image
										src="/cute-cat.svg"
										alt="Ilustracao de gato"
										fill
										className="object-contain"
									/>
								</div>
							</div>
						</div>
					</aside>

					<section className="p-6 md:p-10">
						<p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9b7b65]">
							iPet
						</p>
						<h2 className="mt-2 text-3xl font-black text-[#4b382d]">
							Entrar
						</h2>

						<form onSubmit={handleSubmit} className="mt-8 space-y-5">
							<label className="block">
								<span className="mb-2 block text-sm font-semibold text-[#5f4a3f]">
									Email
								</span>
								<input
									type="email"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									className="w-full rounded-2xl border border-[#d8c9bc] bg-white px-4 py-3 outline-none focus:border-[#d77a42]"
									placeholder="voce@email.com"
								/>
							</label>

							<label className="block">
								<span className="mb-2 block text-sm font-semibold text-[#5f4a3f]">
									Senha
								</span>
								<div className="flex items-center gap-2 rounded-2xl border border-[#d8c9bc] bg-white px-4 py-2">
									<input
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(event) => setPassword(event.target.value)}
										className="w-full bg-transparent py-1 outline-none"
										placeholder="Sua senha"
									/>
									<button
										type="button"
										onClick={() => setShowPassword((prev) => !prev)}
										className="rounded-full p-2 text-[#7c6351] transition hover:bg-[#f3ece4]"
										aria-label="Mostrar ou ocultar senha"
									>
										{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
									</button>
								</div>
							</label>

							<button
								type="submit"
								disabled={loading}
								className="w-full rounded-full bg-[#d77a42] px-6 py-3 text-lg font-bold text-white transition hover:bg-[#c66a32] disabled:opacity-70"
							>
								{loading ? "Entrando..." : "Entrar"}
							</button>
						</form>

						<p className="mt-6 text-sm text-[#6e5748]">
							Ainda nao tem conta?{" "}
							<Link
								href="/auth/register"
								className="font-bold text-[#b96a31] underline"
							>
								Cadastrar-se
							</Link>
						</p>
					</section>
				</div>
			</div>
		</>
	);
}

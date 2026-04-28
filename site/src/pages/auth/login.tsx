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

			<div className="min-h-screen bg-[#f7f1eb] px-4 py-12 flex items-center justify-center">
				<div className="w-full max-w-5xl overflow-hidden rounded-[24px] border border-[#e0d1c3] bg-white shadow-[0_10px_40px_rgba(92,64,42,0.08)] md:grid md:grid-cols-2">
					{/* Left Side */}
					<aside className="relative hidden min-h-full bg-[linear-gradient(135deg,#f5d8c5_0%,#fde7d6_100%)] p-12 md:flex md:flex-col md:justify-between">
						<div className="absolute inset-0 opacity-40" style={{backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(215,122,66,0.1) 0%, transparent 50%)'}} />
						<div className="relative z-10">
							<div className="mb-2 inline-block">
								<p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7b65]">
									Bem-vindo
								</p>
							</div>
							<h1 className="mt-4 text-4xl font-black leading-tight text-[#4b382d]">
								Conecte-se com seu pet
						</h1>
						<p className="mt-6 text-sm leading-relaxed text-[#6e5748] max-w-sm">
								Acesse sua conta, compartilhe momentos especiais com seu pet e conecte-se com a comunidade iPet.
							</p>
						</div>

						<div className="relative z-10 w-full h-48 overflow-hidden rounded-[16px] shadow-[0_8px_24px_rgba(92,64,42,0.15)] mt-8">
							<Image
								src="/pets-banner.jpg"
								alt="Pets"
								fill
								className="object-cover"
							/>
						</div>
					</aside>

					{/* Right Side */}
					<section className="flex flex-col justify-center p-8 md:p-12">
						<div className="mb-8">
							<p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7b65] mb-3">
								iPet
							</p>
							<h2 className="text-3xl font-black text-[#4b382d]">
								Entrar
							</h2>
						</div>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label className="block">
									<span className="mb-2.5 block text-sm font-semibold text-[#5f4a3f]">
										Email
									</span>
									<input
										type="email"
										value={email}
										onChange={(event) => setEmail(event.target.value)}
										className="w-full rounded-lg border border-[#e0d1c3] bg-[#fafaf8] px-4 py-3 text-[#4b382d] placeholder-[#9b7b65] outline-none transition-all duration-200 focus:bg-white focus:border-[#d77a42] focus:ring-2 focus:ring-[#d77a42]/10"
										placeholder="seu@email.com"
										required
									/>
								</label>
							</div>

							<div>
								<label className="block">
									<span className="mb-2.5 block text-sm font-semibold text-[#5f4a3f]">
										Senha
									</span>
									<div className="flex items-center gap-0 rounded-lg border border-[#e0d1c3] bg-[#fafaf8] px-4 py-3 transition-all duration-200 focus-within:bg-white focus-within:border-[#d77a42] focus-within:ring-2 focus-within:ring-[#d77a42]/10">
										<input
											type={showPassword ? "text" : "password"}
											value={password}
											onChange={(event) => setPassword(event.target.value)}
											className="w-full bg-transparent text-[#4b382d] placeholder-[#9b7b65] outline-none"
											placeholder="Digite sua senha"
											required
										/>
										<button
											type="button"
											onClick={() => setShowPassword((prev) => !prev)}
											className="ml-2 rounded-md p-1.5 text-[#7c6351] transition-colors hover:bg-[#f3ece4] hover:text-[#d77a42]"
											aria-label="Mostrar ou ocultar senha"
										>
											{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
										</button>
									</div>
								</label>
							</div>

							<button
								type="submit"
								disabled={loading}
								className="w-full rounded-lg bg-[#d77a42] px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-[#c66a32] hover:shadow-[0_8px_20px_rgba(215,122,66,0.3)] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
							>
								{loading ? (
									<span className="flex items-center justify-center gap-2">
										<span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></span>
										Entrando...
									</span>
								) : (
									"Entrar"
								)}
							</button>
						</form>

						<div className="mt-8 border-t border-[#e0d1c3] pt-8">
							<p className="text-sm text-[#6e5748]">
								Ainda não tem conta?{" "}
								<Link
									href="/auth/register"
									className="font-semibold text-[#d77a42] transition-colors hover:text-[#c66a32]"
								>
									Criar conta
								</Link>
							</p>
						</div>
					</section>
				</div>
			</div>
		</>
	);
}

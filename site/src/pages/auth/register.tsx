import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useError } from "@/hooks/useError";
import { motion, AnimatePresence } from "framer-motion";

type AccountForm = {
	email: string;
	senha: string;
	confirmarSenha: string;
};

type ProfileForm = {
	tag: string;
	nome: string;
	nascimento: string;
	raca: string;
	foto: File | null;
};

export default function RegisterPage() {
	const error = useError();
	const [step, setStep] = useState<1 | 2>(1);
	const [loading, setLoading] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const [account, setAccount] = useState<AccountForm>({
		email: "",
		senha: "",
		confirmarSenha: "",
	});

	const [profile, setProfile] = useState<ProfileForm>({
		tag: "",
		nome: "",
		nascimento: "",
		raca: "",
		foto: null,
	});

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	const handleAccountChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setAccount((prev) => ({ ...prev, [name]: value }));
		},
		[]
	);

	const handleProfileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setProfile((prev) => ({ ...prev, [name]: value }));
		},
		[]
	);

	const handleFileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0] || null;
			if (previewUrl) URL.revokeObjectURL(previewUrl);
			setProfile((prev) => ({ ...prev, foto: file }));
			setPreviewUrl(file ? URL.createObjectURL(file) : null);
		},
		[previewUrl]
	);

	function validateAccountStep() {
		if (!account.email || !account.senha || !account.confirmarSenha) {
			error.throwError("Preencha todos os campos.");
			return false;
		}
		if (!account.email.includes("@")) {
			error.throwError("Email inválido.");
			return false;
		}
		if (account.senha.length < 6) {
			error.throwError("Senha mínima de 6 caracteres.");
			return false;
		}
		if (account.senha !== account.confirmarSenha) {
			error.throwError("Senhas não coincidem.");
			return false;
		}
		return true;
	}

	function validateProfileStep() {
		if (
			!profile.tag ||
			!profile.nome ||
			!profile.nascimento ||
			!profile.raca ||
			!profile.foto
		) {
			error.throwError("Preencha todos os dados do pet.");
			return false;
		}
		return true;
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!validateAccountStep() || !validateProfileStep()) return;

		try {
			setLoading(true);

			const formData = new FormData();
			formData.append("email", account.email);
			formData.append("senha", account.senha);
			formData.append("tag", profile.tag.toLowerCase());
			formData.append("nome", profile.nome);
			formData.append("nascimento", profile.nascimento);
			formData.append("raca", profile.raca);
			formData.append("foto", profile.foto as File);

			await axios.post("/api/user/register", formData);

			const result = await signIn("credentials", {
				email: account.email,
				password: account.senha,
				redirect: false,
			});

			if (result?.url) window.location.href = result.url;
		} catch (err: any) {
			error.throwError(err?.response?.data?.error || "Erro ao cadastrar.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Head>
				<title>iPet - Cadastro</title>
			</Head>

			<div className="min-h-screen bg-[#f7f1eb] px-4 py-8 md:py-12 flex items-center justify-center">
				<div className="w-full max-w-5xl overflow-hidden rounded-[24px] border border-[#e0d1c3] bg-white shadow-[0_10px_40px_rgba(92,64,42,0.08)] md:grid md:grid-cols-2">
					
					{/* Left Side */}
					<aside className="relative hidden min-h-full bg-[linear-gradient(135deg,#f5d8c5_0%,#fde7d6_100%)] p-10 md:flex md:flex-col md:justify-between">
						<div className="absolute inset-0 opacity-40" style={{backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(215,122,66,0.1) 0%, transparent 50%)'}} />
						<div className="relative z-10">
							<div className="mb-2 inline-block">
								<p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7b65]">
									Bem-vindo
								</p>
							</div>
							<h1 className="mt-4 text-3xl font-black leading-tight text-[#4b382d]">
								Crie sua conta iPet
							</h1>
							<p className="mt-5 text-sm leading-relaxed text-[#6e5748]">
								Registre seu pet, compartilhe seus melhores momentos e conecte-se com uma comunidade apaixonada por animais.
							</p>
						</div>

						<div className="relative z-10 w-full h-40 overflow-hidden rounded-[16px] shadow-[0_8px_24px_rgba(92,64,42,0.15)]">
							<Image
								src="/pets-banner.jpg"
								alt="Pets"
								fill
								className="object-cover"
							/>
						</div>
					</aside>

					{/* Right Side - Form */}
					<section className="flex flex-col justify-center p-8 md:p-10">
						<div className="mb-8">
							<p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7b65] mb-2">
								Registrar
							</p>
							<h2 className="text-2xl font-black text-[#4b382d]">
								Crie sua conta
							</h2>
							
							{/* PROGRESS BAR */}
							<div className="mt-5 h-1.5 bg-[#e0d1c3] rounded-full overflow-hidden">
								<div
									className="h-full transition-all duration-500 rounded-full"
									style={{
										width: step === 1 ? "50%" : "100%",
										backgroundColor: step === 1 ? "#d77a42" : "#89a36e"
									}}
								/>
							</div>
							<p className="mt-2 text-xs text-[#9b7b65] font-medium">
								Etapa {step} de 2
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-6 flex-1">
							<AnimatePresence mode="wait">

								{step === 1 && (
									<motion.div
										key="step1"
										initial={{ opacity: 0, x: 40 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -40 }}
										transition={{ duration: 0.3 }}
										className="space-y-4"
									>
										{/* Email */}
										<div>
											<label className="block">
												<span className="mb-2.5 block text-sm font-semibold text-[#5f4a3f]">
													Email
												</span>
												<input
													type="email"
													name="email"
													value={account.email}
													onChange={handleAccountChange}
													className="w-full rounded-lg border border-[#e0d1c3] bg-[#fafaf8] px-4 py-3 text-[#4b382d] placeholder-[#9b7b65] outline-none transition-all duration-200 focus:bg-white focus:border-[#d77a42] focus:ring-2 focus:ring-[#d77a42]/10"
													placeholder="seu@email.com"
													required
												/>
											</label>
										</div>

										{/* Senha */}
										<div>
											<label className="block">
												<span className="mb-2.5 block text-sm font-semibold text-[#5f4a3f]">
													Senha
												</span>
												<input
													type="password"
													name="senha"
													value={account.senha}
													onChange={handleAccountChange}
													className="w-full rounded-lg border border-[#e0d1c3] bg-[#fafaf8] px-4 py-3 text-[#4b382d] placeholder-[#9b7b65] outline-none transition-all duration-200 focus:bg-white focus:border-[#d77a42] focus:ring-2 focus:ring-[#d77a42]/10"
													placeholder="Mínimo 6 caracteres"
													required
												/>
											</label>
										</div>

										{/* Confirmar Senha */}
										<div>
											<label className="block">
												<span className="mb-2.5 block text-sm font-semibold text-[#5f4a3f]">
													Confirmar Senha
												</span>
												<input
													type="password"
													name="confirmarSenha"
													value={account.confirmarSenha}
													onChange={handleAccountChange}
													className="w-full rounded-lg border border-[#e0d1c3] bg-[#fafaf8] px-4 py-3 text-[#4b382d] placeholder-[#9b7b65] outline-none transition-all duration-200 focus:bg-white focus:border-[#d77a42] focus:ring-2 focus:ring-[#d77a42]/10"
													placeholder="Confirme sua senha"
													required
												/>
											</label>
										</div>

										<button
											type="button"
											onClick={() => validateAccountStep() && setStep(2)}
											className="w-full rounded-lg bg-[#d77a42] px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-[#c66a32] hover:shadow-[0_8px_20px_rgba(215,122,66,0.3)] mt-1"
										>
											Continuar
										</button>

									</motion.div>
								)}

								{step === 2 && (
									<motion.div
										key="step2"
										initial={{ opacity: 0, x: 40 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -40 }}
										transition={{ duration: 0.3 }}
										className="space-y-4"
									>
										{/* Tag */}
										<div>
											<label className="block">
												<span className="mb-2.5 block text-sm font-semibold text-[#5f4a3f]">
													Nome de usuário
												</span>
												<input
													type="text"
													name="tag"
													value={profile.tag}
													onChange={handleProfileChange}
													className="w-full rounded-lg border border-[#e0d1c3] bg-[#fafaf8] px-4 py-3 text-[#4b382d] placeholder-[#9b7b65] outline-none transition-all duration-200 focus:bg-white focus:border-[#d77a42] focus:ring-2 focus:ring-[#d77a42]/10"
													placeholder="@seupet"
													required
												/>
											</label>
										</div>

										{/* Nome do Pet */}
										<div>
											<label className="block">
												<span className="mb-2.5 block text-sm font-semibold text-[#5f4a3f]">
													Nome do pet
												</span>
												<input
													type="text"
													name="nome"
													value={profile.nome}
													onChange={handleProfileChange}
													className="w-full rounded-lg border border-[#e0d1c3] bg-[#fafaf8] px-4 py-3 text-[#4b382d] placeholder-[#9b7b65] outline-none transition-all duration-200 focus:bg-white focus:border-[#d77a42] focus:ring-2 focus:ring-[#d77a42]/10"
													placeholder="Fluffy, Max, Lua..."
													required
												/>
											</label>
										</div>

										{/* Raça */}
										<div>
											<label className="block">
												<span className="mb-2.5 block text-sm font-semibold text-[#5f4a3f]">
													Raça
												</span>
												<input
													type="text"
													name="raca"
													value={profile.raca}
													onChange={handleProfileChange}
													className="w-full rounded-lg border border-[#e0d1c3] bg-[#fafaf8] px-4 py-3 text-[#4b382d] placeholder-[#9b7b65] outline-none transition-all duration-200 focus:bg-white focus:border-[#d77a42] focus:ring-2 focus:ring-[#d77a42]/10"
													placeholder="Ex: Golden Retriever"
													required
												/>
											</label>
										</div>

										{/* Data de Nascimento */}
										<div>
											<label className="block">
												<span className="mb-2.5 block text-sm font-semibold text-[#5f4a3f]">
													Data de nascimento
												</span>
												<input
													type="date"
													name="nascimento"
													value={profile.nascimento}
													onChange={handleProfileChange}
													className="w-full rounded-lg border border-[#e0d1c3] bg-[#fafaf8] px-4 py-3 text-[#4b382d] placeholder-[#9b7b65] outline-none transition-all duration-200 focus:bg-white focus:border-[#d77a42] focus:ring-2 focus:ring-[#d77a42]/10"
													required
												/>
											</label>
										</div>

										{/* Upload de Foto */}
										<div>
											<span className="mb-2.5 block text-sm font-semibold text-[#5f4a3f]">
												Foto do pet
											</span>
											<label className="block border-2 border-dashed border-[#d8c9bc] rounded-lg p-8 text-center cursor-pointer transition-all duration-200 hover:border-[#d77a42] hover:bg-[#fafaf8] bg-[#fffdf9]">
												{previewUrl ? (
													<div className="flex flex-col items-center gap-3">
														<img src={previewUrl} className="mx-auto h-32 w-32 object-cover rounded-lg" />
														<span className="text-xs text-[#9b7b65] font-medium">Clique para alterar</span>
													</div>
												) : (
													<div className="flex flex-col items-center gap-2">
														<span className="text-2xl">📷</span>
														<span className="text-sm font-medium text-[#5f4a3f]">Adicionar foto</span>
														<span className="text-xs text-[#9b7b65]">PNG, JPG até 5MB</span>
													</div>
												)}
												<input type="file" hidden onChange={handleFileChange} accept="image/*" />
											</label>
										</div>

										<div className="flex gap-3 mt-6 pt-2">
											<button
												type="button"
												onClick={() => setStep(1)}
												className="flex-1 rounded-lg border border-[#d8c9bc] px-6 py-3.5 text-base font-semibold text-[#5f4a3f] transition-all duration-200 hover:bg-[#f3ece4] hover:border-[#c9b8aa]"
											>
												Voltar
											</button>

											<button
												type="submit"
												disabled={loading}
												className="flex-1 rounded-lg bg-[#89a36e] px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-[#7a9260] hover:shadow-[0_8px_20px_rgba(137,163,110,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
											>
												{loading ? (
													<span className="flex items-center justify-center gap-2">
														<span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></span>
														Criando...
													</span>
												) : (
													"Criar conta"
												)}
											</button>
										</div>

									</motion.div>
								)}

							</AnimatePresence>

						</form>

						<div className="mt-6 border-t border-[#e0d1c3] pt-6">
							<p className="text-sm text-[#6e5748]">
								Já tem conta?{" "}
								<Link
									href="/auth/login"
									className="font-semibold text-[#d77a42] transition-colors hover:text-[#c66a32]"
								>
									Entrar
								</Link>
							</p>
						</div>

					</section>

				</div>
			</div>
		</>
	);
}
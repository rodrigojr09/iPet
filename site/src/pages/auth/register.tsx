import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useError } from "@/hooks/useError";

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
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target;
			setAccount((prev) => ({ ...prev, [name]: value }));
		},
		[]
	);

	const handleProfileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target;
			setProfile((prev) => ({ ...prev, [name]: value }));
		},
		[]
	);

	const handleFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0] || null;
			if (previewUrl) URL.revokeObjectURL(previewUrl);
			setProfile((prev) => ({ ...prev, foto: file }));
			setPreviewUrl(file ? URL.createObjectURL(file) : null);
		},
		[previewUrl]
	);

	function validateAccountStep() {
		if (!account.email.trim() || !account.senha || !account.confirmarSenha) {
			error.throwError("Preencha todos os campos da conta.");
			return false;
		}

		if (!account.email.includes("@")) {
			error.throwError("Digite um email valido.");
			return false;
		}

		if (account.senha.length < 6) {
			error.throwError("A senha deve ter ao menos 6 caracteres.");
			return false;
		}

		if (account.senha !== account.confirmarSenha) {
			error.throwError("As senhas nao coincidem.");
			return false;
		}

		return true;
	}

	function validateProfileStep() {
		if (
			!profile.tag.trim() ||
			!profile.nome.trim() ||
			!profile.nascimento ||
			!profile.raca.trim() ||
			!profile.foto
		) {
			error.throwError("Preencha todos os campos do pet.");
			return false;
		}

		return true;
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!validateAccountStep() || !validateProfileStep()) {
			return;
		}

		try {
			setLoading(true);

			const formData = new FormData();
			formData.append("email", account.email);
			formData.append("senha", account.senha);
			formData.append("tag", profile.tag.trim().toLowerCase());
			formData.append("nome", profile.nome.trim());
			formData.append("nascimento", profile.nascimento);
			formData.append("raca", profile.raca.trim());
			formData.append("foto", profile.foto as File);

			await axios.post("/api/user/register", formData);

			const result = await signIn("credentials", {
				email: account.email,
				password: account.senha,
				redirect: false,
				callbackUrl: "/",
			});

			if (result?.error) {
				error.throwError("Conta criada, mas o login automatico falhou.");
				return;
			}

			if (result?.url) {
				window.location.href = result.url;
			}
		} catch (err: any) {
			console.error(err);
			error.throwError(
				err?.response?.data?.error || "Erro ao criar conta."
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Head>
				<title>iPet - Cadastro</title>
			</Head>

			<div className="min-h-screen bg-[#f7f1eb] px-4 py-8">
				<div className="mx-auto max-w-5xl rounded-[32px] border border-[#d8c9bc] bg-[linear-gradient(180deg,#fffdf9_0%,#f7efe6_100%)] shadow-[0_20px_60px_rgba(92,64,42,0.12)] overflow-hidden">
					<div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
						<section className="p-6 md:p-10">
							<div className="mb-8 flex items-center justify-between">
								<div>
									<p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9b7b65]">
										iPet
									</p>
									<h1 className="mt-2 text-3xl font-black text-[#4b382d]">
										Crie sua conta
									</h1>
								</div>
								<div className="flex items-center gap-2 text-sm font-semibold text-[#7c6351]">
									<span
										className={`flex h-8 w-8 items-center justify-center rounded-full ${
											step === 1
												? "bg-[#d77a42] text-white"
												: "bg-[#e8ddd2]"
										}`}
									>
										1
									</span>
									<span
										className={`flex h-8 w-8 items-center justify-center rounded-full ${
											step === 2
												? "bg-[#89a36e] text-white"
												: "bg-[#e8ddd2]"
										}`}
									>
										2
									</span>
								</div>
							</div>

							<form onSubmit={handleSubmit} className="space-y-5">
								{step === 1 ? (
									<>
										<label className="block">
											<span className="mb-2 block text-sm font-semibold text-[#5f4a3f]">
												Email
											</span>
											<input
												name="email"
												type="email"
												value={account.email}
												onChange={handleAccountChange}
												className="w-full rounded-2xl border border-[#d8c9bc] bg-white px-4 py-3 outline-none focus:border-[#d77a42]"
												placeholder="voce@email.com"
											/>
										</label>

										<label className="block">
											<span className="mb-2 block text-sm font-semibold text-[#5f4a3f]">
												Senha
											</span>
											<input
												name="senha"
												type="password"
												value={account.senha}
												onChange={handleAccountChange}
												className="w-full rounded-2xl border border-[#d8c9bc] bg-white px-4 py-3 outline-none focus:border-[#d77a42]"
												placeholder="Minimo de 6 caracteres"
											/>
										</label>

										<label className="block">
											<span className="mb-2 block text-sm font-semibold text-[#5f4a3f]">
												Confirmar senha
											</span>
											<input
												name="confirmarSenha"
												type="password"
												value={account.confirmarSenha}
												onChange={handleAccountChange}
												className="w-full rounded-2xl border border-[#d8c9bc] bg-white px-4 py-3 outline-none focus:border-[#d77a42]"
												placeholder="Repita sua senha"
											/>
										</label>

										<button
											type="button"
											onClick={() => {
												if (validateAccountStep()) {
													setStep(2);
												}
											}}
											className="w-full rounded-full bg-[#d77a42] px-6 py-3 text-lg font-bold text-white transition hover:bg-[#c66a32]"
										>
											Continuar
										</button>
									</>
								) : (
									<>
										<label className="block">
											<span className="mb-2 block text-sm font-semibold text-[#5f4a3f]">
												Tag do pet
											</span>
											<input
												name="tag"
												type="text"
												value={profile.tag}
												onChange={handleProfileChange}
												className="w-full rounded-2xl border border-[#d8c9bc] bg-white px-4 py-3 outline-none focus:border-[#89a36e]"
												placeholder="thor_dog"
											/>
										</label>

										<label className="block">
											<span className="mb-2 block text-sm font-semibold text-[#5f4a3f]">
												Nome do pet
											</span>
											<input
												name="nome"
												type="text"
												value={profile.nome}
												onChange={handleProfileChange}
												className="w-full rounded-2xl border border-[#d8c9bc] bg-white px-4 py-3 outline-none focus:border-[#89a36e]"
												placeholder="Thor"
											/>
										</label>

										<div className="grid gap-4 md:grid-cols-2">
											<label className="block">
												<span className="mb-2 block text-sm font-semibold text-[#5f4a3f]">
													Nascimento
												</span>
												<input
													name="nascimento"
													type="date"
													value={profile.nascimento}
													onChange={handleProfileChange}
													className="w-full rounded-2xl border border-[#d8c9bc] bg-white px-4 py-3 outline-none focus:border-[#89a36e]"
												/>
											</label>

											<label className="block">
												<span className="mb-2 block text-sm font-semibold text-[#5f4a3f]">
													Raca
												</span>
												<input
													name="raca"
													type="text"
													value={profile.raca}
													onChange={handleProfileChange}
													className="w-full rounded-2xl border border-[#d8c9bc] bg-white px-4 py-3 outline-none focus:border-[#89a36e]"
													placeholder="Labrador"
												/>
											</label>
										</div>

										<label className="block">
											<span className="mb-2 block text-sm font-semibold text-[#5f4a3f]">
												Foto do pet
											</span>
											<input
												type="file"
												accept="image/*"
												onChange={handleFileChange}
												className="block w-full rounded-2xl border border-[#d8c9bc] bg-white px-4 py-3 text-sm"
											/>
										</label>

										<div className="flex gap-3">
											<button
												type="button"
												onClick={() => setStep(1)}
												className="w-full rounded-full border border-[#d8c9bc] bg-white px-6 py-3 text-lg font-bold text-[#6e5748] transition hover:bg-[#f3ece4]"
											>
												Voltar
											</button>
											<button
												type="submit"
												disabled={loading}
												className="w-full rounded-full bg-[#89a36e] px-6 py-3 text-lg font-bold text-white transition hover:bg-[#78915e] disabled:opacity-70"
											>
												{loading ? "Criando..." : "Criar conta"}
											</button>
										</div>
									</>
								)}
							</form>

							<p className="mt-6 text-sm text-[#6e5748]">
								Ja tem uma conta?{" "}
								<Link
									href="/auth/login"
									className="font-bold text-[#b96a31] underline"
								>
									Entrar
								</Link>
							</p>
						</section>

						<aside className="relative min-h-[320px] bg-[linear-gradient(180deg,#fde7d6_0%,#f5d8c5_100%)] p-6 md:p-10">
							<div className="absolute inset-0 bg-[url('/auth-bg-texture.svg')] opacity-30" />
							<div className="relative flex h-full flex-col justify-between">
								<div>
									<p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9b7b65]">
										Perfil do pet
									</p>
									<h2 className="mt-3 text-2xl font-black text-[#4b382d]">
										Seu companheiro tambem merece um perfil bonito.
									</h2>
									<p className="mt-4 text-sm leading-6 text-[#6e5748]">
										Cadastre foto, nome, raca e a tag publica para
										compartilhar posts e interagir com outros pets.
									</p>
								</div>

								<div className="mt-8 flex items-end justify-center gap-4">
									<div className="relative h-40 w-40 overflow-hidden rounded-[28px] border border-[#e8c9b7] bg-white/80 shadow-lg">
										{previewUrl ? (
											<Image
												src={previewUrl}
												alt="Preview do pet"
												fill
												className="object-cover"
											/>
										) : (
											<Image
												src="/cute-dog.svg"
												alt="Ilustracao de cachorro"
												fill
												className="object-contain p-4"
											/>
										)}
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
					</div>
				</div>
			</div>
		</>
	);
}

import { useState, useEffect } from "react";
import axios from "axios";
import { useError } from "@/hooks/useError";
import { signIn } from "next-auth/react";
import Head from "next/head";
import {
	Mail,
	Lock,
	Eye,
	EyeOff,
	User,
	PawPrint,
	Calendar,
	Camera,
} from "lucide-react";

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [petName, setPetName] = useState("");
	const [petBreed, setPetBreed] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [photo, setPhoto] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState<1 | 2>(1);

	const error = useError();

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	const nameValid = name.trim().length >= 3;
	const emailValid = email.trim().length > 3 && email.includes("@");
	const passwordValid = password.trim().length >= 6;
	const confirmPasswordValid = confirmPassword === password && confirmPassword.length > 0;

	const petNameValid = petName.trim().length >= 2;
	const petBreedValid = petBreed.trim().length >= 2;
	const birthDateValid = !!birthDate;

	const validateStepOne = () => {
		if (!nameValid) {
			error.throwError("Digite seu nome.");
			return false;
		}
		if (!emailValid) {
			error.throwError("Digite um email válido.");
			return false;
		}
		if (!passwordValid) {
			error.throwError("A senha deve ter ao menos 6 caracteres.");
			return false;
		}
		if (!confirmPasswordValid) {
			error.throwError("As senhas não conferem.");
			return false;
		}
		return true;
	};

	const validate = () => {
		if (!validateStepOne()) return false;

		if (!petNameValid || !petBreedValid || !birthDateValid) {
			error.throwError("Preencha os dados do pet.");
			return false;
		}

		return true;
	};

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		if (file) {
			setPhoto(file);
			if (previewUrl) URL.revokeObjectURL(previewUrl);
			setPreviewUrl(URL.createObjectURL(file));
		}
	};

	const handleNextStep = () => {
		if (!validateStepOne()) return;
		setStep(2);
	};

	const handlePrevStep = () => {
		setStep(1);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		try {
			setLoading(true);

			const formData = new FormData();
			formData.append("email", email);
			formData.append("senha", password);
			formData.append("nomeUsuario", name);
			formData.append("nome", petName);
			formData.append("nascimento", birthDate);
			formData.append("raca", petBreed);

			if (photo) formData.append("foto", photo);

			await axios.post("/api/user/register", formData);

			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
				callbackUrl: "/",
			});

			if (result?.error) {
				error.throwError("Conta criada, mas não foi possível fazer login automaticamente.");
				return;
			}

			if (result?.url) window.location.href = result.url;
		} catch (err: any) {
			console.error(err);
			error.throwError(err?.response?.data?.error || "Erro ao criar conta.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Head>
				<title>iPet - Cadastre-se</title>
			</Head>

			<div className="min-h-screen bg-[#f8f2eb] relative overflow-hidden py-6 px-3 md:px-6">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(246,238,229,0.98))]" />

				<div className="absolute top-10 left-8 text-[#d9b38c] opacity-60">
					<PawPrint size={28} />
				</div>
				<div className="absolute top-20 right-10 text-[#9fb8bb] opacity-60 rotate-12">
					<PawPrint size={30} />
				</div>
				<div className="absolute bottom-40 left-10 text-[#e8a38d] opacity-60 -rotate-12">
					<PawPrint size={26} />
				</div>
				<div className="absolute bottom-28 right-12 text-[#d9c6a2] opacity-60 rotate-12">
					<PawPrint size={24} />
				</div>

				<div className="relative z-10 max-w-[920px] mx-auto border-2 border-dashed border-[#d8c9bc] rounded-[28px] bg-[rgba(255,251,246,0.78)] px-4 py-5 md:px-8 md:py-8 shadow-[0_10px_30px_rgba(120,90,60,0.08)]">
					<div className="border-t-2 border-dashed border-[#d2c2b3] mb-5" />

					<header className="relative flex flex-col items-center">
						<div className="w-full flex items-center justify-between max-w-[760px] mb-2">
							<div className="hidden md:block">
								<img src="/cute-dog.svg" alt="cachorro" className="w-28 h-auto" />
							</div>

							<div className="flex flex-col items-center">
								<div className="text-[46px] md:text-[64px] font-black leading-none text-[#3f342d] tracking-tight">
									<span className="text-[#6aa8b3]">i</span>Pet
								</div>

								<div className="mt-3 w-[300px] md:w-[560px] h-[62px] md:h-[76px] rounded-[18px] border-[3px] border-[#6b4633] bg-[linear-gradient(180deg,#9a6b50_0%,#7b523f_100%)] shadow-[inset_0_3px_0_rgba(255,255,255,0.18),0_6px_12px_rgba(94,62,43,0.18)] flex items-center justify-center">
									<h1 className="text-white text-[28px] md:text-[40px] font-black drop-shadow-sm">
										Registre-se
									</h1>
								</div>
							</div>

							<div className="hidden md:block">
								<img src="/cute-cat.svg" alt="gato" className="w-24 h-auto" />
							</div>
						</div>

						<div className="mt-5 flex items-center justify-center gap-2 md:gap-5 w-full">
							<div
								className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-full text-sm md:text-[18px] font-bold shadow ${
									step === 1 ? "bg-[#d97c43] text-white" : "bg-[#e7d7ca] text-[#8a6d5a]"
								}`}
							>
								<span
									className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold ${
										step === 1
											? "bg-[#fff1df] text-[#b15e2f]"
											: "bg-[#f6ede6] text-[#8a6d5a]"
									}`}
								>
									1
								</span>
								Pai do Pet
							</div>

							<div className="text-[#b48763] text-xl md:text-3xl font-bold">→</div>

							<div
								className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-full text-sm md:text-[18px] font-bold shadow ${
									step === 2 ? "bg-[#9baa84] text-white" : "bg-[#e7d7ca] text-[#8a6d5a]"
								}`}
							>
								<span
									className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold ${
										step === 2
											? "bg-[#eef3e4] text-[#74845f]"
											: "bg-[#f6ede6] text-[#8a6d5a]"
									}`}
								>
									2
								</span>
								Cadastro do Pet
							</div>
						</div>
					</header>

					<form onSubmit={handleSubmit} className="mt-8 flex justify-center">
						<div className="w-full max-w-[650px] bg-[#fffdfa] border border-[#ddd0c4] rounded-[30px] px-5 py-7 md:px-10 md:py-8 shadow-[0_5px_15px_rgba(0,0,0,0.08)]">
							<h2 className="text-center text-[24px] md:text-[32px] font-extrabold text-[#4f4037]">
								{step === 1 ? "Informações do Pai/Mãe de Pet" : "Informações do Pet"}
							</h2>

							<div className="mt-4 border-t-2 border-dashed border-[#e6d8ca]" />

							{step === 1 && (
								<div className="mt-7 space-y-5">
									<label className="block">
										<span className="flex items-center gap-2 text-[#5b473b] font-semibold text-[16px] md:text-[18px] mb-2">
											<User size={18} />
											Nome
										</span>

										<div className="flex items-center gap-3 rounded-2xl border border-[#d8c9bc] bg-white px-4 h-[58px]">
											<User size={20} className="text-[#c8b8aa]" />
											<input
												type="text"
												placeholder="Seu nome"
												value={name}
												onChange={(e) => setName(e.target.value)}
												className="flex-1 bg-transparent outline-none text-[#5a463a] placeholder:text-[#b7a79a]"
											/>
										</div>
									</label>

									<label className="block">
										<span className="flex items-center gap-2 text-[#5b473b] font-semibold text-[16px] md:text-[18px] mb-2">
											<Mail size={18} />
											E-mail
										</span>

										<div className="flex items-center gap-3 rounded-2xl border border-[#d8c9bc] bg-white px-4 h-[58px]">
											<Mail size={20} className="text-[#c8b8aa]" />
											<input
												type="email"
												placeholder="E-mail"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className="flex-1 bg-transparent outline-none text-[#5a463a] placeholder:text-[#b7a79a]"
											/>
										</div>
									</label>

									<label className="block">
										<span className="flex items-center gap-2 text-[#5b473b] font-semibold text-[16px] md:text-[18px] mb-2">
											<Lock size={18} />
											Senha
										</span>

										<div className="flex items-center gap-3 rounded-2xl border border-[#d8c9bc] bg-white px-4 h-[58px]">
											<Lock size={20} className="text-[#c8b8aa]" />
											<input
												type={showPassword ? "text" : "password"}
												placeholder="****"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												className="flex-1 bg-transparent outline-none text-[#5a463a] placeholder:text-[#7a6558] font-semibold tracking-[0.2em]"
											/>

											<button
												type="button"
												onClick={() => setShowPassword((s) => !s)}
												className="h-10 px-4 rounded-xl border border-[#d8c4ab] bg-[#f8e4c7] text-[#7a5a3a] font-semibold hover:bg-[#f3dbb7] transition flex items-center gap-2"
											>
												{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
												{showPassword ? "Ocultar" : "Mostrar"}
											</button>
										</div>
									</label>

									<label className="block">
										<span className="flex items-center gap-2 text-[#5b473b] font-semibold text-[16px] md:text-[18px] mb-2">
											<Lock size={18} />
											Confirmar Senha
										</span>

										<div className="flex items-center gap-3 rounded-2xl border border-[#d8c9bc] bg-white px-4 h-[58px]">
											<Lock size={20} className="text-[#c8b8aa]" />
											<input
												type="password"
												placeholder="****"
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												className="flex-1 bg-transparent outline-none text-[#5a463a] placeholder:text-[#7a6558] font-semibold tracking-[0.2em]"
											/>
										</div>
									</label>

									<div className="pt-3 flex justify-center">
										<button
											type="button"
											onClick={handleNextStep}
											className="w-full max-w-[360px] h-[62px] rounded-full bg-[#e97b2e] hover:bg-[#d86f27] text-white text-[28px] md:text-[30px] font-extrabold shadow-[inset_0_-5px_0_rgba(0,0,0,0.14),0_6px_10px_rgba(184,103,41,0.24)] transition active:scale-[0.98]"
										>
											Próximo
										</button>
									</div>
								</div>
							)}

							{step === 2 && (
								<div className="mt-7 space-y-5">
									<label className="block">
										<span className="flex items-center gap-2 text-[#5b473b] font-semibold text-[16px] md:text-[18px] mb-2">
											<PawPrint size={18} />
											Nome do Pet
										</span>

										<div className="flex items-center gap-3 rounded-2xl border border-[#d8c9bc] bg-white px-4 h-[58px]">
											<PawPrint size={20} className="text-[#c8b8aa]" />
											<input
												type="text"
												placeholder="Nome do pet"
												value={petName}
												onChange={(e) => setPetName(e.target.value)}
												className="flex-1 bg-transparent outline-none text-[#5a463a] placeholder:text-[#b7a79a]"
											/>
										</div>
									</label>

									<label className="block">
										<span className="flex items-center gap-2 text-[#5b473b] font-semibold text-[16px] md:text-[18px] mb-2">
											<PawPrint size={18} />
											Raça
										</span>

										<div className="flex items-center gap-3 rounded-2xl border border-[#d8c9bc] bg-white px-4 h-[58px]">
											<PawPrint size={20} className="text-[#c8b8aa]" />
											<input
												type="text"
												placeholder="Raça"
												value={petBreed}
												onChange={(e) => setPetBreed(e.target.value)}
												className="flex-1 bg-transparent outline-none text-[#5a463a] placeholder:text-[#b7a79a]"
											/>
										</div>
									</label>

									<label className="block">
										<span className="flex items-center gap-2 text-[#5b473b] font-semibold text-[16px] md:text-[18px] mb-2">
											<Calendar size={18} />
											Data de Nascimento
										</span>

										<div className="flex items-center gap-3 rounded-2xl border border-[#d8c9bc] bg-white px-4 h-[58px]">
											<Calendar size={20} className="text-[#c8b8aa]" />
											<input
												type="date"
												value={birthDate}
												onChange={(e) => setBirthDate(e.target.value)}
												className="flex-1 bg-transparent outline-none text-[#5a463a]"
											/>
										</div>
									</label>

									<div className="block">
										<span className="flex items-center gap-2 text-[#5b473b] font-semibold text-[16px] md:text-[18px] mb-3">
											<Camera size={18} />
											Foto do Pet
										</span>

										<div className="rounded-[24px] border border-[#d8c9bc] bg-white p-4 flex flex-col md:flex-row items-center gap-4">
											<div className="w-24 h-24 rounded-full bg-[#fff6ef] border border-[#e6d6c8] flex items-center justify-center overflow-hidden shadow-sm">
												{previewUrl ? (
													<img
														src={previewUrl}
														alt="preview"
														className="w-full h-full object-cover"
													/>
												) : (
													<img
														src="/cute-dog.svg"
														alt="placeholder pet"
														className="w-14 h-14"
													/>
												)}
											</div>

											<div className="flex-1 text-center md:text-left">
												<input
													id="photo"
													type="file"
													accept="image/*"
													onChange={handleFile}
													className="hidden"
												/>
												<label
													htmlFor="photo"
													className="inline-block bg-[#f8e4c7] border border-[#d8c4ab] text-[#7a5a3a] font-semibold px-5 py-3 rounded-xl cursor-pointer hover:bg-[#f3dbb7] transition"
												>
													Selecionar foto do pet
												</label>
												<p className="text-xs text-[#8C6F5A] mt-2">Opcional</p>
											</div>
										</div>
									</div>

									<div className="pt-3 flex flex-col md:flex-row justify-center gap-3">
										<button
											type="button"
											onClick={handlePrevStep}
											className="w-full md:w-[190px] h-[58px] rounded-[18px] border border-[#d9c9ba] bg-[#f8f1e8] text-[#6b594c] text-[24px] font-semibold shadow-sm hover:bg-[#f3e8db] transition"
										>
											Voltar
										</button>

										<button
											type="submit"
											disabled={loading}
											className="w-full md:flex-1 max-w-[360px] h-[62px] rounded-full bg-[#e97b2e] hover:bg-[#d86f27] text-white text-[24px] md:text-[28px] font-extrabold shadow-[inset_0_-5px_0_rgba(0,0,0,0.14),0_6px_10px_rgba(184,103,41,0.24)] transition active:scale-[0.98] disabled:opacity-60"
										>
											{loading ? "Criando..." : "Criar conta"}
										</button>
									</div>
								</div>
							)}
						</div>
					</form>

					<section className="mt-10 text-center">
						<p className="text-[#58463b] text-[24px] md:text-[34px] font-bold">
							Agora, cadastre seu Pet
						</p>

						<div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
							<div className="flex flex-col items-center">
								<img
									src="/sleeping-cat.svg"
									alt="gato dormindo"
									className="w-44 md:w-52"
								/>
							</div>

							<div className="flex flex-col items-center">
								<img src="/cute-dog.svg" alt="cachorro" className="w-40 md:w-48" />
							</div>
						</div>

						<div className="mt-8 text-[#5a463b] text-[20px] md:text-[30px]">
							Já tem uma conta?{" "}
							<a href="/auth/login" className="text-[#b96a31] font-extrabold underline">
								Entrar
							</a>
						</div>
					</section>

					<div className="mt-8 border-t-2 border-dashed border-[#cdb9a8]" />
				</div>
			</div>
		</>
	);
}
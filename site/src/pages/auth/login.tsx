import { useState } from "react";
import { Eye, EyeOff, Lock, User, Mail } from "lucide-react";
import Head from "next/head";

export default function RegisterForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const [touched, setTouched] = useState({
		name: false,
		email: false,
		password: false,
		confirmPassword: false,
	});

	const nameValid = name.trim().length >= 3;
	const emailValid = email.trim().length > 3 && email.includes("@");
	const passwordValid = password.trim().length >= 6;
	const confirmPasswordValid = confirmPassword === password && confirmPassword.length > 0;

	async function handleSubmit() {
		setTouched({
			name: true,
			email: true,
			password: true,
			confirmPassword: true,
		});

		if (!nameValid || !emailValid || !passwordValid || !confirmPasswordValid) return;

		setLoading(true);

		setTimeout(() => {
			setLoading(false);
			alert("Próxima etapa: Cadastro do Pet");
		}, 800);
	}

	return (
		<>
			<Head>
				<title>iPet - Registre-se</title>
			</Head>

			<div className="min-h-screen bg-[#f7f1eb] relative overflow-hidden flex flex-col items-center py-6 px-4">
				<div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(245,237,228,0.95))]" />

				<div className="relative z-10 w-full max-w-[860px] border-2 border-dashed border-[#d9c7b7] rounded-[28px] px-4 md:px-8 py-6 bg-[rgba(255,252,248,0.72)] shadow-[0_8px_30px_rgba(120,90,60,0.08)]">
					<header className="flex flex-col items-center">
						<div className="w-full border-t-2 border-dashed border-[#cdb9a8] mb-5" />

						<div className="relative flex items-center justify-center w-full">
							<div className="absolute left-[8%] top-1 hidden md:block">
								<img
									src="/cute-dog.svg"
									alt="cachorro"
									className="w-28 drop-shadow-md"
								/>
							</div>

							<div className="absolute right-[8%] top-1 hidden md:block">
								<img
									src="/cute-cat.svg"
									alt="gato"
									className="w-24 drop-shadow-md"
								/>
							</div>

							<div className="flex flex-col items-center">
								<div className="text-[56px] leading-none font-black text-[#3f322b] tracking-tight">
									<span className="text-[#6ba6b1]">i</span>Pet
								</div>

								<div className="mt-4 relative w-full max-w-[700px]">
									<div className="h-[72px] md:h-[82px] rounded-[18px] bg-[linear-gradient(180deg,#9a6a4e_0%,#7e543d_100%)] border-[3px] border-[#6b4633] shadow-[inset_0_3px_0_rgba(255,255,255,0.2),0_5px_12px_rgba(94,62,43,0.25)] flex items-center justify-center">
										<h1 className="text-white text-[34px] md:text-[42px] font-black tracking-wide drop-shadow-sm">
											Registre-se
										</h1>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-6 flex items-center justify-center gap-3 md:gap-6 w-full">
							<div className="flex items-center gap-2 bg-[#d87c43] text-white px-4 md:px-6 py-2 rounded-full shadow font-bold text-sm md:text-[18px]">
								<span className="w-7 h-7 rounded-full bg-[#fff1df] text-[#b15e2f] flex items-center justify-center font-extrabold">
									1
								</span>
								Pai do Pet
							</div>

							<div className="text-[#b48763] text-2xl font-bold">→</div>

							<div className="flex items-center gap-2 bg-[#9aaa84] text-white px-4 md:px-6 py-2 rounded-full shadow font-bold text-sm md:text-[18px]">
								<span className="w-7 h-7 rounded-full bg-[#eef3e4] text-[#74845f] flex items-center justify-center font-extrabold">
									2
								</span>
								Cadastro do Pet
							</div>
						</div>
					</header>

					<main className="mt-8 flex justify-center">
						<div className="w-full max-w-[620px] bg-[#fffdfa] border border-[#ddd0c4] rounded-[30px] px-6 md:px-10 py-8 shadow-[0_5px_15px_rgba(0,0,0,0.08)]">
							<h2 className="text-center text-[28px] md:text-[32px] font-extrabold text-[#4f4037]">
								Informações do Pai/Mãe de Pet
							</h2>

							<div className="mt-4 border-t-2 border-dashed border-[#e6d8ca]" />

							<div className="mt-7 space-y-5">
								<label className="block">
									<span className="flex items-center gap-2 text-[#5b473b] font-semibold text-[16px] md:text-[18px] mb-2">
										<User size={18} />
										Nome
									</span>

									<div
										className={`flex items-center gap-3 rounded-2xl border bg-white px-4 h-[58px] ${
											touched.name && !nameValid ? "border-red-300" : "border-[#d8c9bc]"
										}`}
									>
										<User size={20} className="text-[#c8b8aa]" />
										<input
											type="text"
											placeholder="Seu nome"
											value={name}
											onChange={(e) => setName(e.target.value)}
											onBlur={() => setTouched((old) => ({ ...old, name: true }))}
											className="flex-1 bg-transparent outline-none text-[#5a463a] placeholder:text-[#b7a79a]"
										/>
									</div>
									{touched.name && !nameValid && (
										<p className="text-xs text-red-500 mt-1">Digite seu nome.</p>
									)}
								</label>

								<label className="block">
									<span className="flex items-center gap-2 text-[#5b473b] font-semibold text-[16px] md:text-[18px] mb-2">
										<Mail size={18} />
										E-mail
									</span>

									<div
										className={`flex items-center gap-3 rounded-2xl border bg-white px-4 h-[58px] ${
											touched.email && !emailValid ? "border-red-300" : "border-[#d8c9bc]"
										}`}
									>
										<Mail size={20} className="text-[#c8b8aa]" />
										<input
											type="email"
											placeholder="E-mail"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											onBlur={() => setTouched((old) => ({ ...old, email: true }))}
											className="flex-1 bg-transparent outline-none text-[#5a463a] placeholder:text-[#b7a79a]"
										/>
									</div>
									{touched.email && !emailValid && (
										<p className="text-xs text-red-500 mt-1">Digite um e-mail válido.</p>
									)}
								</label>

								<label className="block">
									<span className="flex items-center gap-2 text-[#5b473b] font-semibold text-[16px] md:text-[18px] mb-2">
										<Lock size={18} />
										Senha
									</span>

									<div
										className={`flex items-center gap-3 rounded-2xl border bg-white px-4 h-[58px] ${
											touched.password && !passwordValid ? "border-red-300" : "border-[#d8c9bc]"
										}`}
									>
										<Lock size={20} className="text-[#c8b8aa]" />
										<input
											type={showPassword ? "text" : "password"}
											placeholder="****"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											onBlur={() => setTouched((old) => ({ ...old, password: true }))}
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
									{touched.password && !passwordValid && (
										<p className="text-xs text-red-500 mt-1">A senha precisa ter ao menos 6 caracteres.</p>
									)}
								</label>

								<label className="block">
									<span className="flex items-center gap-2 text-[#5b473b] font-semibold text-[16px] md:text-[18px] mb-2">
										<Lock size={18} />
										Confirmar Senha
									</span>

									<div
										className={`flex items-center gap-3 rounded-2xl border bg-white px-4 h-[58px] ${
											touched.confirmPassword && !confirmPasswordValid
												? "border-red-300"
												: "border-[#d8c9bc]"
										}`}
									>
										<Lock size={20} className="text-[#c8b8aa]" />
										<input
											type="password"
											placeholder="****"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											onBlur={() =>
												setTouched((old) => ({ ...old, confirmPassword: true }))
											}
											className="flex-1 bg-transparent outline-none text-[#5a463a] placeholder:text-[#7a6558] font-semibold tracking-[0.2em]"
										/>
									</div>
									{touched.confirmPassword && !confirmPasswordValid && (
										<p className="text-xs text-red-500 mt-1">As senhas não coincidem.</p>
									)}
								</label>

								<div className="pt-3 flex justify-center">
									<button
										type="button"
										onClick={() => void handleSubmit()}
										disabled={loading}
										className="w-full max-w-[360px] h-[62px] rounded-full bg-[#e97b2e] hover:bg-[#d86f27] text-white text-[30px] font-extrabold shadow-[inset_0_-5px_0_rgba(0,0,0,0.14),0_6px_10px_rgba(184,103,41,0.24)] transition active:scale-[0.98] disabled:opacity-60"
									>
										{loading ? "Carregando..." : "Próximo"}
									</button>
								</div>
							</div>
						</div>
					</main>

					<section className="mt-10 text-center">
						<p className="text-[#58463b] text-[26px] md:text-[34px] font-bold">
							Agora, cadastre seu Pet
						</p>

						<div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
							<div className="flex flex-col items-center">
								<img src="/sleeping-cat.svg" alt="gato dormindo" className="w-44 md:w-52" />
							</div>

							<div className="flex flex-col items-center">
								<img src="/cute-dog.svg" alt="cachorro" className="w-40 md:w-48" />
							</div>
						</div>

						<div className="mt-8 text-[#5a463b] text-[22px] md:text-[30px]">
							Já tem uma conta?{" "}
							<a href="/auth/login" className="text-[#b96a31] font-extrabold underline">
								Entrar
							</a>
						</div>

						<div className="mt-8 flex justify-center">
							<button
								type="button"
								className="min-w-[190px] h-[58px] rounded-[18px] border border-[#d9c9ba] bg-[#f8f1e8] text-[#6b594c] text-[28px] font-semibold shadow-sm hover:bg-[#f3e8db] transition"
							>
								Voltar
							</button>
						</div>
					</section>

					<div className="mt-8 border-t-2 border-dashed border-[#cdb9a8]" />
				</div>
			</div>
		</>
	);
}
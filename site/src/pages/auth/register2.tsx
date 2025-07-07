import FormAccount from "@/components/auth/Register/FormAccount";
import FormProfile from "@/components/auth/Register/FormProfile";
import { useError } from "@/hooks/useError";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";

export interface AccountProps {
	email: string;
	senha: string;
	confirmarSenha?: string;
}
export interface ProfileProps {
	tag: string;
	nome: string;
	nascimento: string;
	raca: string;
	foto: File | null;
}

export default function SignUp() {
	const [step, setStep] = useState(1);
	const router = useRouter();
	const error = useError();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [agree, setAgree] = useState(false);

	const [account, setAccount] = useState<AccountProps>({
		email: "",
		senha: "",
		confirmarSenha: "",
	});
	const [profile, setProfile] = useState<ProfileProps>({
		tag: "",
		nome: "",
		nascimento: "",
		raca: "",
		foto: null,
	});

	const handleChangeAccount = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setAccount((prev) => ({ ...prev, [name]: value }));
		},
		[]
	);

	const handleChangeProfile = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setProfile((prev) => ({ ...prev, [name]: value }));
		},
		[]
	);

	const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		if (files && files[0]) {
			const file = files[0];
			setProfile((prev) => ({ ...prev, foto: file }));
		}
	}, []);

	const handleNextStep = () => {
		// Validação simples do primeiro passo
		if (
			!account.email.trim() ||
			!account.senha ||
			!account.confirmarSenha
		) {
			error.throwError("Preencha todos os campos de conta.");
			return;
		}
		if (account.senha !== account.confirmarSenha) {
			error.throwError("As senhas não conferem.");
			return;
		}
		setStep(2);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (step === 1) return handleNextStep();

		if (
			!profile.nome.trim() ||
			!profile.nascimento ||
			!profile.raca.trim() ||
			!profile.foto
		) {
			error.throwError("Preencha todos os campos do perfil.");
			return;
		}

		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("email", account.email);
			formData.append("senha", account.senha);
			formData.append("nome", profile.nome);
			formData.append("nascimento", profile.nascimento);
			formData.append("raca", profile.raca);
			formData.append("foto", profile.foto as any); // blob ou file
			formData.append("tag", profile.tag);

			const res = await axios.post("/api/user/register", formData);

			if (res.status === 201) {
				await signIn("credentials", {
					email: account.email,
					password: account.senha,
					redirect: true,
					callbackUrl: "/",
				});
			} else {
				error.throwError("Erro ao registrar usuário.");
			}
		} catch (err) {
			console.error(err);
			error.throwError("Erro ao registrar usuário.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen w-full flex">
			<div className="flex flex-row w-full mx-auto">
				{/* Left side: image & svg, aparece só em desktop */}
				<div className="hidden xl:block relative h-full w-1/2 overflow-hidden bg-gradient-to-tr from-[#242348] to-[#5A55AA]">
					<Image
						src="/banner_register.jpg"
						alt="banner da pagina de registro"
						fill
						className="object-cover object-center"
						priority
					/>
				</div>

				{/* Right side: form content */}
				<form
					onSubmit={handleSubmit}
					className="flex flex-col flex-1 bg-gray-50 px-6 py-[14vh] xl:py-[10vh] relative"
				>
					<header className="mb-12 text-center">
						<h1 className="text-4xl font-extrabold text-[#5c6ccd] mb-4">
							{step === 1 && "Cadastre-se"}
							{step === 2 && "Adicione seu Pet"}
						</h1>
						<p className="text-xl text-[#5753b5cc]">
							Bem-vindo, venha fazer parte do nosso mundo pet.
						</p>
						{step === 2 && (
							<button
								onClick={() => setStep(1)}
								className="absolute top-4 left-4 text-[#5753b5cc] hover:text-[#5c6ccd]"
							>
								<ChevronLeft size={50} />
							</button>
						)}
					</header>

					{step === 1 && (
						<FormAccount
							account={account}
							handleChangeAccount={handleChangeAccount}
						/>
					)}
					{step === 2 && (
						<FormProfile
							profile={profile}
							handleChangeProfile={handleChangeProfile}
							handleFile={handleFile}
						/>
					)}
					{/* Checkbox */}
					<div className="max-w-md mx-auto w-full mb-10 flex items-center">
						<input
							id="agree"
							type="checkbox"
							required
							checked={agree}
							onChange={(e) => setAgree(e.target.checked)}
							className="w-5 h-5 text-[#5c6ccd] border-2 border-gray-400 rounded focus:ring-2 focus:ring-[#5c6ccd] cursor-pointer"
						/>
						<label
							htmlFor="agree"
							className="ml-4 text-[#5753b5cc] cursor-pointer text-lg select-none"
						>
							Eu concordo com os termos e condições
						</label>
					</div>

					{/* Button */}
					<div className="text-center">
						<button
							id="sign-up-button"
							type="submit"
							disabled={
								(step === 1 &&
									(!account.email ||
										!account.senha ||
										!account.confirmarSenha ||
										!agree)) ||
								(step === 2 &&
									(!profile.foto ||
										!profile.tag ||
										!profile.raca ||
										!profile.nascimento ||
										!profile.nome)) ||
								!agree
							}
							className="inline-block px-14 py-4 text-lg font-bold text-white rounded bg-[#5c6ccd] disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#767fd1] focus:bg-[#4a4a8b] focus:outline-none transition duration-200 ease-in-out"
						>
							{loading && "Cadastrando..."}
							{success && "Cadastrado com sucesso!"}
							{!loading &&
								!success &&
								(step === 1
									? "Proximo"
									: step === 2 && "Cadastrar")}
						</button>
					</div>

					{/* Sign in link */}
					<div className="mt-8 mb-5 text-center text-[#5c6ccd] underline cursor-pointer">
						Já possui uma conta?&nbsp;
						<a href="#" className="hover:text-[#3e3c6f]">
							Login
						</a>
					</div>

					{/* Terms link */}
					<div className="mb-20 text-center text-[#5c6ccd] underline cursor-pointer">
						<a href="#" className="hover:text-[#3e3c6f]">
							Termos de uso. Politica de privacidade
						</a>
					</div>
				</form>
			</div>
		</main>
	);
}

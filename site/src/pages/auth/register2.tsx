import FormAccount from "@/components/auth/Register/FormAccount";
import { useError } from "@/hooks/useError";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
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
	const error = useError();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

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
				<section className="flex flex-col flex-1 bg-gray-50 px-6 py-[14vh] xl:py-[10vh]">
					<header className="mb-12 text-center">
						<h1 className="text-4xl font-extrabold text-[#5c6ccd] mb-4">
							Cadastre-se
						</h1>
						<p className="text-xl text-[#5753b5cc]">
							Bem-vindo, venha fazer parte do nosso mundo pet.
						</p>
					</header>

					{step === 1 && (
						<FormAccount
							account={account}
							handleChangeAccount={handleChangeAccount}
							handleSubmit={handleSubmit}
						/>
					)}
				</section>
			</div>
		</main>
	);
}

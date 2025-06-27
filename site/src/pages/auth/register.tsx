import { ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";
import axios from "axios";
import { useError } from "@/hooks/useError";
import { signIn } from "next-auth/react";

interface Account {
	email: string;
	senha: string;
	confirmarSenha?: string;
}

interface Profile {
	nome: string;
	nascimento: string;
	raca: string;
}

export default function Register() {
	const [step, setStep] = useState(1);
    const error = useError();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

	const [account, setAccount] = useState<Account>({
		email: "",
		senha: "",
		confirmarSenha: "",
	});
	const [profile, setProfile] = useState<Profile>({
		nome: "",
		nascimento: "",
		raca: "",
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
		if (!profile.nome.trim() || !profile.nascimento || !profile.raca.trim()) {
			error.throwError("Preencha todos os campos do perfil.");
			return;
		}
		try {
			
            const res = await axios.post("/api/user/register", { ...account, profile });
            if (res.status === 201) {
                signIn("credentials", { email: account.email, password: account.senha, redirect: true,callbackUrl: "/" });
            } else {
                error.throwError("Erro ao registrar usuário.");
                console.log(res.statusText);
            }
		} catch (err) {
			error.throwError("Erro ao registrar usuário.");
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
			<div
				id="container"
				className={`relative overflow-hidden rounded-lg shadow-2xl bg-white max-w-full w-[768px] min-h-[480px] transition-all duration-600 ease-in-out ${
					step === 2 ? "right-panel-active" : ""
				}`}
			>
				{/* Sign In Container */}
				<div
					className={`absolute top-0 h-full w-1/2 transition-transform duration-600 ease-in-out ${
						step === 2 ? "translate-x-full" : "left-0"
					}`}
				>
					<form
						className="flex flex-col items-center justify-center h-full px-12 text-center bg-white"
						onSubmit={(e) => e.preventDefault()}
						aria-label="Formulário de criação de conta"
					>
						<h1 className="font-extrabold text-3xl mb-6">
							Crie sua Conta
						</h1>

						<input
							name="email"
							type="email"
							placeholder="Email"
							className="bg-gray-200 border-0 rounded p-3 my-2 w-full placeholder-gray-500"
							onChange={handleChangeAccount}
							value={account.email}
							required
							aria-required="true"
							aria-label="Email"
						/>
						<input
							name="senha"
							type="password"
							placeholder="Senha"
							className="bg-gray-200 border-0 rounded p-3 my-2 w-full placeholder-gray-500"
							onChange={handleChangeAccount}
							value={account.senha}
							required
							aria-required="true"
							aria-label="Senha"
						/>
						<input
							name="confirmarSenha"
							type="password"
							placeholder="Confirmar senha"
							className="bg-gray-200 border-0 rounded p-3 my-2 w-full placeholder-gray-500"
							onChange={handleChangeAccount}
							value={account.confirmarSenha}
							required
							aria-required="true"
							aria-label="Confirmar senha"
						/>

						<button
							type="button"
							onClick={handleNextStep}
							className="mt-6 rounded-full border border-[#ff4b2b] bg-[#ff4b2b] px-12 py-3 text-xs font-bold uppercase text-white transition-transform active:scale-95 focus:outline-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Próximo <ChevronRight />
						</button>
					</form>
				</div>

				{/* Sign Up Container */}
				<div
					className={`absolute top-0 h-full w-1/2 left-0 transition-opacity duration-600 ease-in-out bg-white px-12 text-center flex flex-col items-center justify-center ${
						step === 2
							? "opacity-100 translate-x-full animate-show"
							: "opacity-0 pointer-events-none"
					}`}
				>
					<form
						className="flex flex-col w-full"
						onSubmit={handleSubmit}
						aria-label="Formulário de criação de perfil"
					>
						<h1 className="font-extrabold text-3xl mb-4">
							Agora, Crie o perfil do seu Pet
						</h1>

						<input
							name="nome"
							type="text"
							placeholder="Nome"
							className="bg-gray-200 border-0 rounded p-3 my-2 w-full placeholder-gray-500"
							onChange={handleChangeProfile}
							value={profile.nome}
							required
							aria-required="true"
							aria-label="Nome do pet"
						/>
						<input
							name="nascimento"
							type="date"
							placeholder="Data de Nascimento"
							className="bg-gray-200 border-0 rounded p-3 my-2 w-full placeholder-gray-500"
							onChange={handleChangeProfile}
							value={profile.nascimento}
							required
							aria-required="true"
							aria-label="Data de nascimento do pet"
						/>
						<input
							name="raca"
							type="text"
							placeholder="Raça"
							className="bg-gray-200 border-0 rounded p-3 my-2 w-full placeholder-gray-500"
							onChange={handleChangeProfile}
							value={profile.raca}
							required
							aria-required="true"
							aria-label="Raça do pet"
						/>

						<button
                            type="submit"
                            disabled={loading}
							className="mt-6 rounded-full border border-[#ff4b2b] bg-[#ff4b2b] px-12 py-3 text-xs font-bold uppercase text-white transition-transform active:scale-95 focus:outline-none"
						>
							{ loading ? "Carregando..." : "Criar"}
						</button>
					</form>
				</div>

				{/* Overlay Container */}
				<div
					className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out ${
						step === 2 ? "-translate-x-full" : "translate-x-0"
					}`}
				>
					<div
						className="bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] bg-no-repeat bg-cover bg-left relative w-[200%] h-full transform transition-transform duration-600 ease-in-out"
						style={{ left: "-100%" }}
					>
						<div className="absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-10 text-center text-white transition-transform duration-600 ease-in-out transform -translate-x-1/5">
							<h1 className="text-4xl font-extrabold mb-2">
								Olá, seja bem vindo!
							</h1>
							<p>
								Antes de mais nada, vamos criar uma conta para
								você!
							</p>
						</div>

						<div className="absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center px-10 text-center text-white transition-transform duration-600 ease-in-out transform translate-x-0">
							<h1 className="text-4xl font-extrabold mb-2">
								Agora, é a vez do seu animalzinho!
							</h1>
							<p>Vamos criar um perfil para ele</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

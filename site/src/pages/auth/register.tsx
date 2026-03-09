import { ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useError } from "@/hooks/useError";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface Account {
	email: string;
	senha: string;
	confirmarSenha?: string;
}

interface Profile {
	tag: string;
	nome: string;
	nascimento: string;
	raca: string;
	foto: File | null;
}

export default function Register() {
	const [step, setStep] = useState(1);
	const error = useError();
	const [loading, setLoading] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [account, setAccount] = useState<Account>({
		email: "",
		senha: "",
		confirmarSenha: "",
	});
	const [profile, setProfile] = useState<Profile>({
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
		if (files?.[0]) {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
			setProfile((prev) => ({ ...prev, foto: files[0] }));
			setPreviewUrl(URL.createObjectURL(files[0]));
		}
	}, [previewUrl]);

	const handleNextStep = () => {
		if (!account.email.trim() || !account.senha || !account.confirmarSenha) {
			error.throwError("Preencha todos os campos da conta.");
			return;
		}
		if (account.senha !== account.confirmarSenha) {
			error.throwError("As senhas nao conferem.");
			return;
		}
		setStep(2);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			!profile.nome.trim() ||
			!profile.nascimento ||
			!profile.raca.trim() ||
			!profile.tag.trim() ||
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
			formData.append("foto", profile.foto);
			formData.append("tag", profile.tag);

			await axios.post("/api/user/register", formData);

			const result = await signIn("credentials", {
				email: account.email,
				password: account.senha,
				redirect: false,
				callbackUrl: "/",
			});

			if (result?.error) {
				error.throwError("Conta criada, mas nao foi possivel entrar.");
				return;
			}

			if (result?.url) {
				window.location.href = result.url;
			}
		} catch (err: any) {
			console.error(err);
			error.throwError(
				err?.response?.data?.error || "Erro ao registrar usuario."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 text-black">
			<div
				id="container"
				className={`relative overflow-hidden rounded-lg shadow-2xl bg-white max-w-full w-[768px] min-h-[480px] transition-all duration-600 ease-in-out ${
					step === 2 ? "right-panel-active" : ""
				}`}
			>
				<div
					className={`absolute top-0 h-full w-1/2 transition-transform duration-600 ease-in-out ${
						step === 2 ? "translate-x-full" : "left-0"
					}`}
				>
					<form
						className="flex flex-col items-center justify-center h-full px-12 text-center bg-white"
						onSubmit={(e) => e.preventDefault()}
					>
						<h1 className="font-extrabold text-3xl mb-6">
							Crie sua conta
						</h1>

						<input
							name="email"
							type="email"
							placeholder="Email"
							className="bg-gray-200 border-0 rounded p-3 my-2 w-full placeholder-gray-500"
							onChange={handleChangeAccount}
							value={account.email}
							required
						/>
						<input
							name="senha"
							type="password"
							placeholder="Senha"
							className="bg-gray-200 border-0 rounded p-3 my-2 w-full placeholder-gray-500"
							onChange={handleChangeAccount}
							value={account.senha}
							required
						/>
						<input
							name="confirmarSenha"
							type="password"
							placeholder="Confirmar senha"
							className="bg-gray-200 border-0 rounded p-3 my-2 w-full placeholder-gray-500"
							onChange={handleChangeAccount}
							value={account.confirmarSenha}
							required
						/>

						<button
							type="button"
							onClick={handleNextStep}
							className="mt-6 rounded-full border border-[#ff4b2b] bg-[#ff4b2b] px-12 py-3 text-xs font-bold uppercase text-white transition-transform active:scale-95 focus:outline-none flex items-center justify-center gap-2"
						>
							Proximo <ChevronRight />
						</button>
					</form>
				</div>

				<div
					className={`absolute top-0 h-full w-1/2 left-0 transition-opacity duration-600 ease-in-out bg-white px-12 text-center flex flex-col items-center justify-center ${
						step === 2
							? "opacity-100 translate-x-full animate-show"
							: "opacity-0 pointer-events-none"
					}`}
				>
					<form className="flex flex-col w-full" onSubmit={handleSubmit}>
						<h1 className="font-extrabold text-3xl mb-4">
							Agora, crie o perfil do seu pet
						</h1>
						<input
							name="tag"
							type="text"
							placeholder="Tag"
							className="bg-gray-200 border-0 rounded p-3 my-2 w-full placeholder-gray-500"
							onChange={handleChangeProfile}
							value={profile.tag}
							required
						/>
						<input
							name="nome"
							type="text"
							placeholder="Nome"
							className="bg-gray-200 border-0 rounded p-3 my-2 w-full placeholder-gray-500"
							onChange={handleChangeProfile}
							value={profile.nome}
							required
						/>
						<input
							name="nascimento"
							type="date"
							className="bg-gray-200 border-0 rounded p-3 my-2 w-full placeholder-gray-500"
							onChange={handleChangeProfile}
							value={profile.nascimento}
							required
						/>
						<input
							name="raca"
							type="text"
							placeholder="Raca"
							className="bg-gray-200 border-0 rounded p-3 my-2 w-full placeholder-gray-500"
							onChange={handleChangeProfile}
							value={profile.raca}
							required
						/>

						<button
							type="submit"
							disabled={loading}
							className="mt-6 rounded-full border border-[#ff4b2b] bg-[#ff4b2b] px-12 py-3 text-xs font-bold uppercase text-white transition-transform active:scale-95 focus:outline-none disabled:opacity-70"
						>
							{loading ? "Carregando..." : "Criar"}
						</button>
					</form>
				</div>

				<div
					className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out ${
						step === 2 ? "-translate-x-full" : "translate-x-0"
					}`}
				>
					<div
						className="bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] bg-no-repeat bg-cover bg-left relative w-[200%] h-full transform transition-transform duration-600 ease-in-out"
						style={{ left: "-100%" }}
					>
						{step === 1 && (
							<div className="absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center px-10 text-center text-white">
								<h1 className="text-4xl font-extrabold mb-2">
									Ola, seja bem-vindo
								</h1>
								<p>Antes de tudo, vamos criar sua conta.</p>
							</div>
						)}

						{step === 2 && (
							<div className="absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center px-10 text-center text-white">
								<h1 className="text-4xl font-extrabold mb-4">
									De um rosto ao seu pet
								</h1>

								<div className="w-32 h-32 mx-auto mb-2">
									<Image
										src={previewUrl || "/default-avatar.jpeg"}
										alt="Preview do pet"
										width={100}
										height={100}
										className="w-full h-full object-cover rounded-full border border-gray-300 shadow"
									/>
								</div>
								<input
									type="file"
									className="hidden"
									onChange={handleFile}
									required
									id="file"
									accept="image/*"
								/>
								<label
									className="mt-6 rounded-full border border-[#ff4b2b] bg-[#ff4b2b] px-12 py-3 text-xs font-bold uppercase text-white transition-transform active:scale-95 focus:outline-none cursor-pointer"
									htmlFor="file"
								>
									{profile.foto ? "Alterar imagem" : "Selecionar imagem"}
								</label>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

import FormAccount from "@/components/auth/Register/FormAccount";
import FormProfile from "@/components/auth/Register/FormProfile";
import { useState } from "react";

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

export default function Register2() {
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

	return (
		<div className="min-h-screen bg-gray-100 py-10 px-4">
			<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-8">
				<div>
					<h1 className="text-2xl font-bold mb-6">Conta</h1>
					<FormAccount
						account={account}
						handleChangeAccount={(e) =>
							setAccount((prev) => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
					/>
				</div>
				<div>
					<h2 className="text-2xl font-bold mb-6">Perfil do pet</h2>
					<FormProfile
						profile={profile}
						handleChangeProfile={(e) =>
							setProfile((prev) => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
						handleFile={(e) =>
							setProfile((prev) => ({
								...prev,
								foto: e.target.files?.[0] || null,
							}))
						}
					/>
				</div>
			</div>
		</div>
	);
}

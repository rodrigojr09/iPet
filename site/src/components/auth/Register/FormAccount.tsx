import { AccountProps } from "@/pages/auth/register2";

interface FormProps {
	account: AccountProps;
	handleChangeAccount: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormAccount({
	account,
	handleChangeAccount,
	handleSubmit,
}: FormProps) {
	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto w-full">
			{/* Email */}
			<div className="relative flex flex-col mb-10 h-10">
				<input
					id="email"
					name="email"
					type="email"
					placeholder=" "
					required
					value={account.email}
					onChange={handleChangeAccount}
					className="peer h-full w-full border-b-2 border-gray-300 bg-transparent px-2 text-lg text-[#5753b5] placeholder-transparent focus:border-[#5c6ccd] focus:outline-none"
				/>
				<label
					htmlFor="email"
					className={`absolute left-2 text-[#7a78a9] text-base transition-all duration-200
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-[#5753b5]
                        peer-focus:top-[-0.8rem] peer-focus:text-sm peer-focus:text-[#5c6ccd]
                        ${
							account.email.trim() !== ""
								? "top-[-0.8rem] text-sm text-[#5c6ccd]"
								: "top-2"
						}`}
				>
					Email
				</label>
			</div>

			{/* Password */}
			<div className="relative flex flex-col mb-10 h-10">
				<input
					id="password"
					name="senha"
					type="password"
					placeholder=" "
					value={account.senha}
					onChange={handleChangeAccount}
					required
					className="peer h-full w-full border-b-2 border-gray-300 bg-transparent px-2 text-lg text-[#5753b5] placeholder-transparent focus:border-[#5c6ccd] focus:outline-none"
				/>
				<label
					htmlFor="password"
					className={`absolute left-2 text-[#7a78a9] text-base transition-all duration-200
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-[#5753b5]
                        peer-focus:top-[-0.8rem] peer-focus:text-sm peer-focus:text-[#5c6ccd]
                        ${
							account.senha.trim() !== ""
								? "top-[-0.8rem] text-sm text-[#5c6ccd]"
								: "top-2"
						}`}
				>
					Senha
				</label>
			</div>

			{/* Confirm Password */}
			<div className="relative flex flex-col mb-10 h-10">
				<input
					id="confirm-password"
					type="password"
					placeholder=" "
					name="confirmarSenha"
					value={account.confirmarSenha}
					onChange={handleChangeAccount}
					required
					className="peer h-full w-full border-b-2 border-gray-300 bg-transparent px-2 text-lg text-[#5753b5] placeholder-transparent focus:border-[#5c6ccd] focus:outline-none"
				/>
				<label
					htmlFor="confirm-password"
					className={`absolute left-2 text-[#7a78a9] text-base transition-all duration-200
			peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-[#5753b5]
			peer-focus:top-[-0.8rem] peer-focus:text-sm peer-focus:text-[#5c6ccd]
			${
				account.confirmarSenha?.trim() !== ""
					? "top-[-0.8rem] text-sm text-[#5c6ccd]"
					: "top-2"
			}`}
				>
					Confirmar senha
				</label>
			</div>

			{/* Checkbox */}
			<div className="mb-10 flex items-center">
				<input
					id="agree"
					type="checkbox"
					defaultChecked
					required
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
					disabled
					className="inline-block px-14 py-4 text-lg font-bold text-white rounded bg-[#5c6ccd] disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#767fd1] focus:bg-[#4a4a8b] focus:outline-none transition duration-200 ease-in-out"
				>
					Proximo
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
	);
}

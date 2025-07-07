import { AccountProps } from "@/pages/auth/register2";
import Input from "./Input";
import { useState } from "react";

interface FormProps {
	account: AccountProps;
	handleChangeAccount: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormAccount({
	account,
	handleChangeAccount,
}: FormProps) {
	return (
		<div className="max-w-md mx-auto w-full">
			{/* Email */}
			<Input
				value={account.email}
				type="email"
				id="email"
				placeholder="Email"
				onChange={handleChangeAccount}
			/>

			{/* Password */}
			<Input
				value={account.senha}
				type="password"
				id="senha"
				placeholder="Senha"
				onChange={handleChangeAccount}
			/>

			{/* Confirm Password */}
			<Input
				value={account.confirmarSenha || ""}
				type="password"
				id="confirmarSenha"
				placeholder="Confirmar Senha"
				onChange={handleChangeAccount}
			/>
		</div>
	);
}

import Link from "next/link";

export default function LoginPage() {
	return (
		<div className="flex items-center justify-center h-screen bg-indigo-700 text-white">
			<div className="w-full max-w-md bg-indigo-900 p-8 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-center mb-6">
					Entrar no iPet
				</h1>
				<form
					className="space-y-4"
					onSubmit={(e) => e.preventDefault()}
				>
					<div>
						<label
							htmlFor="email"
							className="block text-lg font-medium"
						>
							Email:
						</label>
						<input
							type="email"
							id="email"
							className="w-full p-3 mt-1 rounded-lg bg-indigo-800 border border-indigo-600 focus:ring-2 focus:ring-pink-500 focus:outline-none text-white"
							placeholder="Digite seu email"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-lg font-medium"
						>
							Senha:
						</label>
						<input
							type="password"
							id="password"
							className="w-full p-3 mt-1 rounded-lg bg-indigo-800 border border-indigo-600 focus:ring-2 focus:ring-pink-500 focus:outline-none text-white"
							placeholder="Digite sua senha"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-pink-600 hover:bg-pink-700 transition-all py-3 rounded-lg text-lg font-semibold"
					>
						Entrar
					</button>
				</form>
				<div className="text-center mt-4 text-sm">
					<Link
						href="/auth/recovery"
						className="text-pink-400 hover:underline"
					>
						Esqueceu sua senha?
					</Link>
				</div>
				<div className="text-center mt-2 text-sm">
					Não tem uma conta?{" "}
					<a
						href="/auth/register"
						className="text-pink-400 font-semibold hover:underline"
					>
						Crie uma agora
					</a>
				</div>
			</div>
		</div>
	);
}

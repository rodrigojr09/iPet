import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Head from "next/head";
import { signIn } from "next-auth/react";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<>
			<Head>
				<title>iPet - Conecte seu pet com a nossa comunidade!</title>
			</Head>

			<div className="w-screen h-screen bg-blue-100 flex items-center justify-center text-xs">
				<div className="relative w-full h-full sm:w-[400px] sm:h-[490px] sm:rounded-md overflow-hidden bg-gradient-to-tr from-yellow-500 to-yellow-300">
					<div className="ear ear--left"></div>
					<div className="ear ear--right"></div>
					<div className="face">
						<div className="eyes">
							<div className="eye eye--left">
								<div className="glow"></div>
							</div>
							<div className="eye eye--right">
								<div className="glow"></div>
							</div>
						</div>
						<div className="nose">
							<svg width="38.161" height="22.03">
								<path
									d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z"
									fill="#243946"
								></path>
							</svg>
							<div className="glow"></div>
						</div>
						<div className="mouth">
							<svg
								className="smile"
								viewBox="-2 -2 84 23"
								width="84"
								height="23"
							>
								<path
									d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161"
									fill="none"
									strokeWidth="3"
									strokeLinecap="square"
									strokeMiterlimit="3"
								></path>
							</svg>
							<div className="mouth-hole"></div>
							<div className="tongue breath">
								<div className="tongue-top"></div>
								<div className="line"></div>
								<div className="median"></div>
							</div>
						</div>
					</div>
					<div className="hands">
						<div className="hand hand--left">
							<div className="finger">
								<div className="bone"></div>
								<div className="nail"></div>
							</div>
							<div className="finger">
								<div className="bone"></div>
								<div className="nail"></div>
							</div>
							<div className="finger">
								<div className="bone"></div>
								<div className="nail"></div>
							</div>
						</div>
						<div className="hand hand--right">
							<div className="finger">
								<div className="bone"></div>
								<div className="nail"></div>
							</div>
							<div className="finger">
								<div className="bone"></div>
								<div className="nail"></div>
							</div>
							<div className="finger">
								<div className="bone"></div>
								<div className="nail"></div>
							</div>
						</div>
					</div>

					<div className="flex flex-col mt-5 px-6 sm:px-10">
						<EmailInput
							value={email}
							onChange={(e: any) => setEmail(e.target.value)}
						/>

						<PasswordInput
							value={password}
							onChange={(e: any) => setPassword(e.target.value)}
						/>

						<button
							onClick={() =>
								signIn("credentials", {
									email,
									password,
									redirect: true,
									callbackUrl: "/",
								})
							}
							className="w-full mt-5 h-12 text-sm bg-slate-800 text-white rounded-full active:scale-95 transition"
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

function EmailInput({ value, onChange, onFocus, onBlur }: any) {
	return (
		<label className="relative block">
			<input
				className="w-full h-12 rounded-full px-4 text-sm sm:text-base placeholder-gray-400 bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
				type="text"
				placeholder="email"
				value={value}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={onChange}
			/>
		</label>
	);
}

function PasswordInput({ value, onChange, onFocus, onBlur }: any) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<label className="relative block mt-3">
			<input
				className="w-full h-12 rounded-full px-4 text-sm sm:text-base placeholder-gray-400 bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
				type={showPassword ? "text" : "password"}
				placeholder="password"
				value={value}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={onChange}
			/>
			<button
				type="button"
				onClick={() => setShowPassword(!showPassword)}
				className="absolute top-[10px] right-[20px] w-[30px] h-[30px] flex items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-700 transition"
			>
				{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
			</button>
		</label>
	);
}

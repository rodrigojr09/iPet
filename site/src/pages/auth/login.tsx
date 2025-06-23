import { useState, useEffect } from "react";
import { Eye, EyeOff, Facebook, Twitter } from "lucide-react";
import Head from "next/head";
import { signIn } from "next-auth/react";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [headRotation, setHeadRotation] = useState(0);
	const [peekHands, setPeekHands] = useState(false);
	const [hideHands, setHideHands] = useState(false);

	useEffect(() => {
		const length = Math.min(email.length - 16, 19);
		setHeadRotation(-length);
	}, [email]);

	return (
		<>
			<Head>
				<title>iPet - Conecte seu pet com a nossa comunidade!</title>
				<style>
					{`.inspiration {
	position: fixed;
	bottom: 0;
	right: 0;
	padding: 10px;
	text-align: center;
	text-decoration: none;
	font-family: "Gill Sans", sans-serif;
	font-size: 12px;
	color: #969696;
}
.inspiration img {
	width: 60px;
}

.ear {
	position: absolute;
	top: -110px;
	width: 250px;
	height: 250px;
	border-radius: 50%;
	background-color: #243946;
}
.ear.ear--left {
	left: -135px;
}
.ear.ear--right {
	right: -135px;
}
.face {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 200px;
	height: 150px;
	margin: 80px auto 10px;
	--rotate-head: 0deg;
	transform: rotate(var(--rotate-head));
	transition: transform 0.2s;
	transform-origin: center 20px;
}
.eye {
	display: inline-block;
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background-color: #243946;
}
.eye.eye--left {
	margin-right: 40px;
}
.eye.eye--right {
	margin-left: 40px;
}
.eye .glow {
	position: relative;
	top: 3px;
	right: -12px;
	width: 12px;
	height: 6px;
	border-radius: 50%;
	background-color: #fff;
	transform: rotate(38deg);
}
.nose {
	position: relative;
	top: 30px;
	transform: scale(1.1);
}
.nose .glow {
	position: absolute;
	top: 3px;
	left: 32%;
	width: 15px;
	height: 8px;
	border-radius: 50%;
	background-color: #476375;
}
.mouth {
	position: relative;
	margin-top: 45px;
}
svg.smile {
	position: absolute;
	left: -28px;
	top: -19px;
	transform: scaleX(1.1);
	stroke: #243946;
}
.mouth-hole {
	position: absolute;
	top: 0;
	left: -50%;
	width: 60px;
	height: 15px;
	border-radius: 50%/100% 100% 0% 0;
	transform: rotate(180deg);
	background-color: #243946;
	z-index: -1;
}
.tongue {
	position: relative;
	top: 5px;
	width: 30px;
	height: 20px;
	background-color: #ffd7dd;
	transform-origin: top;
	transform: rotateX(60deg);
}
.tongue.breath {
	-webkit-animation: breath 0.3s infinite linear;
	animation: breath 0.3s infinite linear;
}
.tongue-top {
	position: absolute;
	bottom: -15px;
	width: 30px;
	height: 30px;
	border-radius: 15px;
	background-color: #ffd7dd;
}
.line {
	position: absolute;
	top: 0;
	width: 30px;
	height: 5px;
	background-color: #fcb7bf;
}
.median {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 4px;
	height: 25px;
	border-radius: 5px;
	background-color: #fcb7bf;
}
.hands {
	position: relative;
}
.hands .hand {
	position: absolute;
	top: -6px;
	display: flex;
	transition: transform 0.5s ease-in-out;
	z-index: 1;
}
.hands .hand--left {
	left: 50px;
}
.hands .hand--left.hide {
	transform: translate(2px, -155px) rotate(-160deg);
}
.hands .hand--left.peek {
	transform: translate(0px, -120px) rotate(-160deg);
}
.hands .hand--right {
	right: 50px;
}
.hands .hand--right.hide {
	transform: translate(-6px, -155px) rotate(160deg);
}
.hands .hand--right.peek {
	transform: translate(-4px, -120px) rotate(160deg);
}
.hands .finger {
	position: relative;
	z-index: 0;
}
.hands .finger .bone {
	width: 20px;
	height: 20px;
	border: 2px solid #243946;
	border-bottom: none;
	border-top: none;
	background-color: #fac555;
}
.hands .finger .nail {
	position: absolute;
	left: 0;
	top: 10px;
	width: 20px;
	height: 18px;
	border-radius: 50%;
	border: 2px solid #243946;
	background-color: #fac555;
	z-index: -1;
}
.hands .finger:nth-child(1),
.hands .finger:nth-child(3) {
	left: 4px;
	z-index: 1;
}
.hands .finger:nth-child(1) .bone,
.hands .finger:nth-child(3) .bone {
	height: 10px;
}
.hands .finger:nth-child(3) {
	left: -4px;
}
.hands .finger:nth-child(2) {
	top: -5px;
	z-index: 2;
}
.hands .finger:nth-child(1) .nail,
.hands .finger:nth-child(3) .nail {
	top: 0px;
}

@-webkit-keyframes breath {
	0%,
	100% {
		transform: rotateX(0deg);
	}
	50% {
		transform: rotateX(60deg);
	}
}
@keyframes breath {
	0%,
	100% {
		transform: rotateX(0deg);
	}
	50% {
		transform: rotateX(60deg);
	}
}`}
				</style>
			</Head>
			<div className="w-screen h-screen bg-blue-100 flex items-center justify-center overflow-hidden text-xs">
				<div className="relative w-[400px] h-[490px] rounded-md overflow-hidden bg-gradient-to-tr from-yellow-500 to-yellow-300">
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

					<div className="flex flex-col mt-3 px-5">
						<EmailInput
							value={email}
							onChange={(e: any) => setEmail(e.target.value)}
							onFocus={() => {
								setPeekHands(false);
								setHideHands(false);
							}}
							onBlur={() => setHeadRotation(0)}
						/>

						<PasswordInput
							value={password}
							onChange={(e: any) => setPassword(e.target.value)}
							onFocus={() => {
								setHideHands(true);
								setPeekHands(false);
							}}
							onBlur={() => {
								setHideHands(false);
								setPeekHands(false);
							}}
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
							className="w-full mt-5 h-[35px] bg-slate-800 text-white rounded-full active:scale-95 transition"
						>
							Login
						</button>
					</div>

					{/* <div className="flex justify-center mt-6">
						<div className="bg-slate-800 text-white w-[35px] h-[35px] flex items-center justify-center rounded-full mx-2 text-sm">
							<Facebook size={16} />
						</div>
						<div className="bg-slate-800 text-white w-[35px] h-[35px] flex items-center justify-center rounded-full mx-2 text-sm">
							<Twitter size={16} />
						</div>
					</div>*/}
				</div>
			</div>
		</>
	);
}

function EmailInput({ value, onChange, onFocus, onBlur }: any) {
	return (
		<label className="relative block">
			<input
				className="w-full h-[35px] rounded-full px-4 text-sm placeholder-gray-400 bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
		<label className="relative mt-2 block">
			<input
				className="w-full h-[35px] rounded-full px-4 text-sm placeholder-gray-400 bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
				className="absolute top-[4px] right-[20px] w-[30px] h-[27px] flex items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-700 transition"
			>
				{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
			</button>
		</label>
	);
}

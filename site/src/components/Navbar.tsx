export default function Navbar() {
	return (
		<nav className="fixed top-0 left-0 w-full bg-indigo-900 shadow-lg py-4 px-8 flex justify-between items-center z-50">
			<h1 className="text-2xl font-bold text-white">iPet</h1>
			<ul className="hidden md:flex space-x-6">
				<li>
					<a href="#sobre" className="hover:text-pink-400 transition">
						Sobre
					</a>
				</li>
				<li>
					<a
						href="#o-que-fazemos"
						className="hover:text-pink-400 transition"
					>
						O que fazemos
					</a>
				</li>
			</ul>
			<a
				href="/auth/login"
				className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg text-lg font-semibold transition-all"
			>
				Login
			</a>
		</nav>
	);
}

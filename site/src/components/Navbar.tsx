"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";
import { Profile } from "@prisma/client";

export default function Navbar() {
	const { profile, logout } = useAuth();
	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [profiles, setProfiles] = useState<Profile[]>([]);

	useEffect(() => {
		fetch("/api/profile")
			.then((res) => res.json())
			.then((data) => setProfiles(data));
	}, []);

	const toggleMenu = () => setIsOpen(!isOpen);

	const filterProfiles = profiles.filter((profile) => {
		return profile.nome.toLowerCase().includes(search.toLowerCase());
	});

	return (
		<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
			<div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
				{/* Logo */}
				<h1 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
					iPet
				</h1>
				{/* Menu Desktop */}
				<nav className="hidden w-full justify-center md:flex space-x-6 py-2 text-gray-700 dark:text-gray-100 text-sm font-medium">
					<Link
						href="/"
						className="hover:text-blue-600 dark:hover:text-blue-400"
					>
						Início
					</Link>
					<Link
						href="/feed"
						className="hover:text-blue-600 dark:hover:text-blue-400"
					>
						Feed
					</Link>
					<Link
						href="/marketplace"
						className="hover:text-blue-600 dark:hover:text-blue-400"
					>
						Marketplace
					</Link>
					<Link
						href="/clinicas"
						className="hover:text-blue-600 dark:hover:text-blue-400"
					>
						Clínicas
					</Link>
					<Link
						href={profile ? "/mypet" : "#"}
						className="hover:text-blue-600 dark:hover:text-blue-400"
					>
						{profile ? "Meu Pet" : "Perfil"}
					</Link>
				</nav>
				{/* Ações Desktop */}
				<div className="hidden md:flex items-center space-x-4">
					{profile ? (
						<>
							{/* Notificações */}
							<button
								className="relative text-xl hover:scale-110 transition-transform"
								aria-label="Notificações"
							>
								🔔
								<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none shadow">
									{
										profile.notifications.filter(
											(n) => !n.visto
										).length
									}
								</span>
							</button>

							{/* Avatar */}
							{profile.foto && (
								<div className="w-[32] h-[32] relative">
									<Image
										alt="avatar-pet"
										src={profile.foto}
										fill
										priority
										className="rounded-full max-w-[32] max-h-[32] object-cover border border-green-500"
									/>
								</div>
							)}

							<button
								className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
								onClick={logout}
							>
								Sair
							</button>
						</>
					) : (
						<>
							<Link
								href="/auth/login"
								className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
							>
								Entrar
							</Link>
							<Link
								href="/auth/register"
								className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm"
							>
								Cadastrar-se
							</Link>
						</>
					)}
				</div>

				{/* Botão Mobile */}
				<button
					className="md:hidden text-gray-800 dark:text-white"
					onClick={toggleMenu}
				>
					{isOpen ? (
						<X className="w-6 h-6" />
					) : (
						<Menu className="w-6 h-6" />
					)}
				</button>
			</div>

			{/* Menu Mobile */}
			{isOpen && (
				<div className="md:hidden px-4 py-6 bg-white dark:bg-gray-900 shadow-lg rounded-b-xl space-y-4 animate-fade-in-down">
					<nav className="flex flex-col space-y-3 text-gray-800 dark:text-white font-medium">
						<Link
							href="/"
							onClick={toggleMenu}
							className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
						>
							🏠 Início
						</Link>
						<Link
							href="/feed"
							onClick={toggleMenu}
							className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
						>
							📰 Feed
						</Link>
						<Link
							href="/marketplace"
							onClick={toggleMenu}
							className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
						>
							🛒 Marketplace
						</Link>
						<Link
							href="/clinicas"
							onClick={toggleMenu}
							className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
						>
							🏥 Clínicas
						</Link>
						{profile && (
							<Link
								href={"/mypet"}
								onClick={toggleMenu}
								className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
							>
								🐶 Meu Pet
							</Link>
						)}
					</nav>

					<hr className="border-gray-200 dark:border-gray-700 my-2" />

					{/* Ações de usuário */}
					<div className="flex flex-col gap-3">
						{profile ? (
							<button
								onClick={() => {
									toggleMenu();
									logout();
								}}
								className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm font-semibold transition-colors"
							>
								Sair
							</button>
						) : (
							<>
								<Link
									href="/auth/login"
									onClick={toggleMenu}
									className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-semibold transition-colors"
								>
									Entrar
								</Link>
								<Link
									href="/auth/register"
									onClick={toggleMenu}
									className="w-full text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-sm font-semibold transition-colors"
								>
									Cadastrar-se
								</Link>
							</>
						)}
					</div>
				</div>
			)}
			{/* Barra de Pesquisa */}
			<div className="hidden w-full md:flex justify-center p-4 relative">
				<div className="flex items-center w-full max-w-md relative">
					<input
						type="text"
						placeholder="Buscar"
						onChange={(e) => setSearch(e.target.value)}
						className="flex-grow py-2 px-4 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full text-sm font-semibold transition-colors">
						Buscar
					</button>

					{/* Dropdown de resultados */}
					{filterProfiles.length > 0 && search !== "" && (
						<div className="absolute max-h-64 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 mt-2">
							<ul className="divide-y divide-gray-200 dark:divide-gray-700">
								{filterProfiles.map((result) => (
									<li
										key={result.id}
										className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-800 dark:text-gray-100"
										onClick={() => {
											setSearch(result.nome);
											// Adicione a ação desejada ao clicar no resultado
										}}
									>
										{result.nome}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}

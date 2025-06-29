"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";

export default function Navbar() {
	const { account, profile, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);


	return (
		<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
			<div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
				{/* Logo */}
				<h1 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
					iPet
				</h1>

				{/* Menu Desktop */}
				<nav className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-100 text-sm font-medium">
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
									0
								</span>
							</button>

							{/* Avatar */}
							{profile.foto && (
								<Image
									src={profile.foto}
									width={32}
									height={32}
									alt="Avatar"
									className="rounded-full max-h-[32]  object-cover border-2 border-blue-600 dark:border-blue-400"
								/>
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
						<Link
							href={profile ? "/mypet" : "#"}
							onClick={toggleMenu}
							className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
						>
							🐶 {profile ? "Meu Pet" : "Perfil"}
						</Link>
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
		</header>
	);
}

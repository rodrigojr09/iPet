import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
	const { account, profile } = useAuth();
	return (
		<header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
			{/* Logo */}
			<h1 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
				iPet
			</h1>

			{/* Links */}
			<nav className="flex space-x-6 text-gray-700 dark:text-gray-100 text-sm font-medium">
				<Link
					href="/"
					className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
				>
					Início
				</Link>
				<Link
					href="/feed"
					className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
				>
					Feed
				</Link>
				<Link
					href="/marketplace"
					className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
				>
					Marketplace
				</Link>
				<Link
					href="/clinicas"
					className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
				>
					Clínicas
				</Link>
				<Link
					href={profile ? "/mypet" : "#"}
					className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
				>
					{profile ? "Meu Pet" : "Perfil"}
				</Link>
			</nav>

			{/* Ações */}
			<div className="flex items-center space-x-4">
				{profile ? (
					<>
						{/* Notificações */}
						<button
							className="relative text-xl hover:scale-110 transition-transform"
							aria-label="Notificações"
						>
							<span role="img" aria-hidden>
								🔔
							</span>
							{
								<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none shadow">
									0
								</span>
							}
						</button>

						{/* Avatar */}
						{profile.avatar && (
							<Image
								src={profile.avatar}
								width={32}
								height={32}
								alt="Avatar"
								className="rounded-full object-cover border-2 border-blue-600 dark:border-blue-400"
							/>
						)}
					</>
				) : (
					<>
						<Link
							href="/login"
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
						>
							Entrar
						</Link>
						<Link
							href="/register"
							className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm transition-colors"
						>
							Cadastrar-se
						</Link>
					</>
				)}
			</div>
		</header>
	);
}

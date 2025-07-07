"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Menu, Search, X } from "lucide-react";
import { Profile } from "@prisma/client";
import useDebounce from "@/hooks/useDebounce";
import moment from "moment-timezone";

export default function Navbar() {
	const { profile, logout } = useAuth();
	const [profiles, setProfiles] = useState<Profile[]>([]);
	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const debouncedSearch = useDebounce(search, 300); // debounce de 300ms
	const [showResults, setShowResults] = useState(false);

	const [showNotifications, setShowNotifications] = useState(false);
	const notificationRef = useRef<HTMLDivElement>(null);

	const filterProfiles = profiles.filter((p) =>
		p.nome.toLowerCase().includes(debouncedSearch.toLowerCase())
	);

	const toggleMenu = () => setIsOpen(!isOpen);

	useEffect(() => {
		fetch("/api/profile")
			.then((res) => res.json())
			.then((data) => setProfiles(data));
	}, []);

	// Fecha o dropdown ao clicar fora
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				setShowResults(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				notificationRef.current &&
				!notificationRef.current.contains(event.target as Node)
			) {
                setShowNotifications(false);
			}
		};
        console.log(profile?.notifications)
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [profile?.notifications]);

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
							<div className="relative" ref={notificationRef}>
								<button
									className="relative text-xl hover:scale-110 transition-transform"
									onClick={() =>
										setShowNotifications((prev) => !prev)
									}
									aria-label="Notificações"
								>
									🔔
									{profile.notifications.some(
										(n) => !n.visto
									) && (
										<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none shadow">
											{
												profile.notifications.filter(
													(n) => !n.visto
												).length
											}
										</span>
									)}
								</button>

								{/* Card flutuante de notificações */}
								{showNotifications && (
									<div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50">
										<div className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-100">
											Notificações
										</div>
										<ul className="max-h-60 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
											{profile.notifications.length >
											0 ? (
												profile.notifications
                                                    .filter((n) => !n.visto)
                                                    .map((n) => {
                                                        const profileInfo = profiles.find(
                                                            (p) => p.id === (n.data as any)?.profile_id
                                                        );
                                            
                                                        return (
															<li
																key={n.id}
																className="flex items-center gap-3 px-4 py-3 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
															>
																<Image
																	src={
																		profileInfo?.foto ||
																		"/default-avatar.jpeg"
																	}
																	alt={
																		profileInfo?.nome ||
																		"Avatar"
																	}
																	width={32}
																	height={32}
																	className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600"
																/>
																<div className="flex flex-col">
																	<span className={"flex-1 "+(!n.visto ? "font-semibold text-blue-400" : "")}>
																		{
																			n.message
																		}
																	</span>
																	<span className="text-xs text-gray-500 dark:text-gray-400">
																		{moment(
																			n.createdAt
																		).fromNow()}
																	</span>
																</div>
															</li>
														);
                                                    })
											) : (
												<li className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 italic">
													Sem novas notificações
												</li>
											)}
										</ul>
										<div className="p-3 border-t border-gray-200 dark:border-gray-700 text-right">
											<button
												className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
												onClick={() => {
													// Chame aqui a função que marca como lidas (você deve criar isso no backend)
													setShowNotifications(false);
												}}
											>
												Marcar todas como lidas
											</button>
										</div>
									</div>
								)}
							</div>

							{/* Avatar */}

							<div className="w-[32] h-[32] relative">
								<Image
									alt="avatar-pet"
									src={profile.foto || "/default-avatar.jpeg"}
									fill
									priority
									className="rounded-full max-w-[32] max-h-[32] object-cover border border-green-500"
								/>
							</div>

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
			<div className="hidden w-full md:flex justify-center p-4 relative z-40">
				<div
					className="flex flex-col w-full max-w-md relative"
					ref={inputRef}
				>
					<div className="flex items-center w-full relative">
						<Search className="absolute left-3 text-gray-400 dark:text-gray-500 w-4 h-4" />
						<input
							type="text"
							placeholder="Buscar pets..."
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
								setShowResults(true);
							}}
							onFocus={() => setShowResults(true)}
							className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{showResults && filterProfiles.length > 0 && (
						<div className="absolute top-12 left-0 w-full max-h-64 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
							<ul className="divide-y divide-gray-200 dark:divide-gray-700">
								{filterProfiles.map((result) => (
									<li key={result.id}>
										<Link
											href={`/${result.tag}`}
											className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 transition-colors"
											onClick={() => {
												setShowResults(false);
												setSearch("");
											}}
										>
											<Image
												src={
													result.foto ||
													"/default-avatar.jpeg"
												}
												alt={result.nome}
												width={32}
												height={32}
												className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600 shadow-sm"
											/>
											<span className="truncate">
												{result.nome}
											</span>
										</Link>
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

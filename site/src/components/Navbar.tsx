"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Menu, Search, X } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import moment from "moment-timezone";
import { Notification, ProfileModel } from "@/types/models";

export default function Navbar() {
	const { profile, logout } = useAuth();
	const [profiles, setProfiles] = useState<ProfileModel[]>([]);
	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);
	const inputRef = useRef<HTMLDivElement>(null);
	const notificationRef = useRef<HTMLDivElement>(null);
	const debouncedSearch = useDebounce(search, 300);

	const filterProfiles = profiles.filter((item) =>
		item.nome.toLowerCase().includes(debouncedSearch.toLowerCase())
	);

	useEffect(() => {
		fetch("/api/profile")
			.then((res) => res.json())
			.then((data) => setProfiles(Array.isArray(data) ? data : []))
			.catch(() => setProfiles([]));
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				setShowResults(false);
			}
			if (
				notificationRef.current &&
				!notificationRef.current.contains(event.target as Node)
			) {
				setShowNotifications(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
			<div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto gap-4">
				<h1 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
					<Link href="/">iPet</Link>
				</h1>

				<nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-100">
					<Link
						href="/"
						className="hover:text-blue-600 dark:hover:text-blue-400"
					>
						Inicio
					</Link>
					{profile && (
						<Link
							href={`/${profile.tag}`}
							className="hover:text-blue-600 dark:hover:text-blue-400"
						>
							Meu perfil
						</Link>
					)}
				</nav>

				<div className="hidden md:flex items-center space-x-4">
					{profile ? (
						<>
							<div className="relative" ref={notificationRef}>
								<button
									className="relative text-xl hover:scale-110 transition-transform"
									onClick={() =>
										setShowNotifications((prev) => !prev)
									}
									aria-label="Notificacoes"
								>
									<span aria-hidden="true">o</span>
									{profile.notifications.some(
										(n: Notification) => !n.visto
									) && (
										<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none shadow">
											{
												profile.notifications.filter(
													(n: Notification) => !n.visto
												).length
											}
										</span>
									)}
								</button>

								{showNotifications && (
									<div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50">
										<div className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-100">
											Notificacoes
										</div>
										<ul className="max-h-60 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
											{profile.notifications.filter(
												(n: Notification) => !n.visto
											).length > 0 ? (
												profile.notifications
													.filter(
														(n: Notification) => !n.visto
													)
													.map((n: Notification) => {
														const profileInfo =
															profiles.find(
																(item) =>
																	item.id ===
																	(n.data as {
																		profile_id?: string;
																	})?.profile_id
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
																	<span className="font-semibold text-blue-400">
																		{n.message}
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
													Sem novas notificacoes
												</li>
											)}
										</ul>
									</div>
								)}
							</div>

							<div className="w-8 h-8 relative">
								<Image
									alt="avatar-pet"
									src={profile.foto || "/default-avatar.jpeg"}
									fill
									priority
									className="rounded-full object-cover border border-green-500"
									sizes="32px"
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

				<button
					className="md:hidden text-gray-800 dark:text-white"
					onClick={() => setIsOpen((prev) => !prev)}
				>
					{isOpen ? (
						<X className="w-6 h-6" />
					) : (
						<Menu className="w-6 h-6" />
					)}
				</button>
			</div>

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

			{isOpen && (
				<div className="md:hidden px-4 py-6 bg-white dark:bg-gray-900 shadow-lg rounded-b-xl space-y-4">
					<nav className="flex flex-col space-y-3 text-gray-800 dark:text-white font-medium">
						<Link
							href="/"
							onClick={() => setIsOpen(false)}
							className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
						>
							Inicio
						</Link>
						{profile && (
							<Link
								href={`/${profile.tag}`}
								onClick={() => setIsOpen(false)}
								className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
							>
								Meu perfil
							</Link>
						)}
					</nav>

					<hr className="border-gray-200 dark:border-gray-700 my-2" />

					<div className="flex flex-col gap-3">
						{profile ? (
							<button
								onClick={() => {
									setIsOpen(false);
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
									onClick={() => setIsOpen(false)}
									className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-semibold transition-colors"
								>
									Entrar
								</Link>
								<Link
									href="/auth/register"
									onClick={() => setIsOpen(false)}
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

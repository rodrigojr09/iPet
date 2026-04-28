"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Bell, Menu, Search, X } from "lucide-react";
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
		<header className="bg-white border-b border-[#e0d1c3] shadow-[0_2px_8px_rgba(92,64,42,0.06)] sticky top-0 z-40">
			<div className="flex justify-between items-center px-4 md:px-6 py-4 max-w-7xl mx-auto gap-4">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
					<div className="w-10 h-10 bg-[linear-gradient(135deg,#d77a42_0%,#d77a42_100%)] rounded-[12px] flex items-center justify-center shadow-[0_4px_12px_rgba(215,122,66,0.3)]">
						<span className="text-white font-black text-lg">🐾</span>
					</div>
					<span className="text-2xl font-black text-[#4b382d] group-hover:text-[#d77a42] transition-colors">iPet</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#6e5748]">
					<Link
						href="/"
						className="relative pb-2 hover:text-[#d77a42] transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#d77a42] after:transition-all hover:after:w-full"
					>
						Início
					</Link>
					{profile && (
						<Link
							href={`/${profile.tag}`}
							className="relative pb-2 hover:text-[#d77a42] transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#d77a42] after:transition-all hover:after:w-full"
						>
							Meu perfil
						</Link>
					)}
				</nav>

				{/* Desktop Actions */}
				<div className="hidden md:flex items-center space-x-4">
					{profile ? (
						<>
							{/* Notification Bell */}
							<div className="relative" ref={notificationRef}>
								<button
									className="relative p-2 text-[#6e5748] hover:bg-[#fffdf9] rounded-lg transition-all hover:text-[#d77a42]"
									onClick={() => setShowNotifications((prev) => !prev)}
									aria-label="Notificações"
								>
									<Bell size={20} />
									{profile.notifications.some((n: Notification) => !n.visto) && (
										<span className="absolute top-1 right-1 bg-[#d77a42] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
											{profile.notifications.filter((n: Notification) => !n.visto).length}
										</span>
									)}
								</button>

								{showNotifications && (
									<div className="absolute right-0 mt-2 w-96 bg-white border border-[#e0d1c3] rounded-[12px] shadow-[0_8px_32px_rgba(92,64,42,0.12)] z-50 overflow-hidden">
										<div className="p-4 border-b border-[#e0d1c3] font-semibold text-[#4b382d]">
											Notificações
										</div>
										<ul className="max-h-64 overflow-y-auto divide-y divide-[#e0d1c3]">
											{profile.notifications.filter((n: Notification) => !n.visto).length > 0 ? (
												profile.notifications
													.filter((n: Notification) => !n.visto)
													.map((n: Notification) => {
														const profileInfo = profiles.find(
															(item) => item.id === (n.data as { profile_id?: string })?.profile_id
														);

														return (
															<li
																key={n.id}
																className="flex items-center gap-3 px-4 py-3 text-sm text-[#6e5748] hover:bg-[#fffdf9] transition-colors"
															>
																<Image
																	src={profileInfo?.foto || "/default-avatar.jpeg"}
																	alt={profileInfo?.nome || "Avatar"}
																	width={36}
																	height={36}
																	className="w-9 h-9 rounded-full object-cover border border-[#e0d1c3]"
																/>
																<div className="flex flex-col flex-1">
																	<span className="font-semibold text-[#4b382d]">
																		{n.message}
																	</span>
																	<span className="text-xs text-[#9b7b65]">
																		{moment(n.createdAt).fromNow()}
																	</span>
																</div>
															</li>
														);
													})
											) : (
												<li className="px-4 py-3 text-sm text-[#9b7b65] italic">
													Sem novas notificações
												</li>
											)}
										</ul>
									</div>
								)}
							</div>

							{/* Avatar */}
							<div className="w-10 h-10 relative border-2 border-[#d77a42] rounded-full overflow-hidden shadow-[0_4px_12px_rgba(215,122,66,0.2)]">
								<Image
									alt="avatar-pet"
									src={profile.foto || "/default-avatar.jpeg"}
									fill
									priority
									className="object-cover"
									sizes="40px"
								/>
							</div>

							{/* Logout Button */}
							<button
								className="px-4 py-2.5 bg-[#d77a42] hover:bg-[#c66a32] text-white rounded-lg font-semibold text-sm transition-all shadow-[0_4px_12px_rgba(215,122,66,0.2)] hover:shadow-[0_6px_16px_rgba(215,122,66,0.3)]"
								onClick={logout}
							>
								Sair
							</button>
						</>
					) : (
						<>
							<Link
								href="/auth/login"
								className="px-4 py-2.5 text-[#d77a42] border-2 border-[#d77a42] rounded-lg font-semibold text-sm hover:bg-[#fffdf9] transition-all"
							>
								Entrar
							</Link>
							<Link
								href="/auth/register"
								className="px-4 py-2.5 bg-[#d77a42] hover:bg-[#c66a32] text-white rounded-lg font-semibold text-sm transition-all shadow-[0_4px_12px_rgba(215,122,66,0.2)] hover:shadow-[0_6px_16px_rgba(215,122,66,0.3)]"
							>
								Cadastrar-se
							</Link>
						</>
					)}
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden p-2 text-[#6e5748] hover:bg-[#fffdf9] rounded-lg transition-all"
					onClick={() => setIsOpen((prev) => !prev)}
				>
					{isOpen ? (
						<X className="w-6 h-6" />
					) : (
						<Menu className="w-6 h-6" />
					)}
				</button>
			</div>

			{/* Search Bar */}
			<div className="hidden md:flex justify-center px-4 pb-4">
				<div
					className="flex flex-col w-full max-w-md relative"
					ref={inputRef}
				>
					<div className="flex items-center w-full relative">
						<Search className="absolute left-3 text-[#9b7b65] w-4 h-4" />
						<input
							type="text"
							placeholder="Buscar pets..."
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
								setShowResults(true);
							}}
							onFocus={() => setShowResults(true)}
							className="w-full py-2.5 pl-10 pr-4 rounded-lg border border-[#e0d1c3] bg-[#fffdf9] text-sm text-[#4b382d] placeholder-[#9b7b65] focus:outline-none focus:border-[#d77a42] focus:ring-2 focus:ring-[#d77a42]/10 transition-all"
						/>
					</div>

					{showResults && filterProfiles.length > 0 && (
						<div className="absolute top-12 left-0 w-full max-h-64 overflow-y-auto bg-white border border-[#e0d1c3] rounded-lg shadow-[0_8px_24px_rgba(92,64,42,0.12)] z-50">
							<ul className="divide-y divide-[#e0d1c3]">
								{filterProfiles.map((result) => (
									<li key={result.id}>
										<Link
											href={`/${result.tag}`}
											className="flex items-center gap-3 px-4 py-3 hover:bg-[#fffdf9] text-sm text-[#4b382d] transition-colors"
											onClick={() => {
												setShowResults(false);
												setSearch("");
											}}
										>
											<Image
												src={result.foto || "/default-avatar.jpeg"}
												alt={result.nome}
												width={32}
												height={32}
												className="w-8 h-8 rounded-full object-cover border border-[#e0d1c3]"
											/>
											<span className="truncate font-medium">{result.nome}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="md:hidden px-4 py-6 bg-gradient-to-br from-[#fffdf9] to-[#f7f1eb] border-t border-[#e0d1c3] space-y-4">
					<nav className="flex flex-col space-y-2 text-[#4b382d] font-semibold">
						<Link
							href="/"
							onClick={() => setIsOpen(false)}
							className="px-4 py-2 hover:bg-[#f3ece4] rounded-lg transition-colors"
						>
							Início
						</Link>
						{profile && (
							<Link
								href={`/${profile.tag}`}
								onClick={() => setIsOpen(false)}
								className="px-4 py-2 hover:bg-[#f3ece4] rounded-lg transition-colors"
							>
								Meu perfil
							</Link>
						)}
					</nav>

					<hr className="border-[#e0d1c3]" />

					<div className="flex flex-col gap-3">
						{profile ? (
							<button
								className="w-full px-4 py-2.5 bg-[#d77a42] hover:bg-[#c66a32] text-white rounded-lg font-semibold text-sm transition-all"
								onClick={() => {
									setIsOpen(false);
									logout();
								}}
							>
								Sair
							</button>
						) : (
							<>
								<Link
									href="/auth/login"
									onClick={() => setIsOpen(false)}
									className="w-full text-center px-4 py-2.5 text-[#d77a42] border-2 border-[#d77a42] rounded-lg font-semibold text-sm hover:bg-[#fffdf9] transition-all"
								>
									Entrar
								</Link>
								<Link
									href="/auth/register"
									onClick={() => setIsOpen(false)}
									className="w-full text-center px-4 py-2.5 bg-[#d77a42] hover:bg-[#c66a32] text-white rounded-lg font-semibold text-sm transition-all"
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

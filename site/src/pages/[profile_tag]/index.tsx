import { useAuth } from "@/hooks/useAuth";
import { useError } from "@/hooks/useError";
import { Prisma } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function ProfilePage() {
	const router = useRouter();
	const { profile: myprofile } = useAuth();
	const error = useError();
	const [loadFollow, setFollowStatus] = useState(true);
	const [profile, setProfile] = useState<
		Prisma.ProfileGetPayload<{
			include: {
				posts: { include: { author: true; comments: true } };
			};
		}>
	>();

	const refresh = useCallback(
		async function () {
			if (!router.query.profile_tag) return;

			try {
				const res = await axios.get(
					`/api/profile/tag/${router.query.profile_tag}?posts=true`
				);
				if (res.status === 200) {
					setProfile(res.data);
					setFollowStatus(false);
				}
			} catch (err) {
				console.error("Erro ao carregar perfil", err);
			}
		},
		[router.query.profile_tag]
	);

	async function follow() {
		if (!profile || !myprofile) return;
		const res = await axios.post(
			`/api/profile/${profile.id}/follow?profile_id=${myprofile.id}`
		);
		if (res.status === 200) {
			refresh();
		} else {
			error.throwError("Erro ao seguir perfil");
			console.log(res.statusText);
		}
	}

	async function unfollow() {
		if (!profile || !myprofile) return;
		const res = await axios.post(
			`/api/profile/${profile.id}/unfollow?profile_id=${myprofile.id}`
		);
		if (res.status === 200) {
			refresh();
		} else {
			error.throwError("Erro ao deixar de seguir perfil");
			console.log(res.statusText);
		}
	}

	useEffect(() => {
		refresh();
	}, [refresh]);

	if (!profile) return null;

	return (
		<div className="max-w-5xl mx-auto px-4 md:py-10">
			{/* Header */}
			<div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
				{/* Avatar */}
				<div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]">
					<Image
						src={profile.foto}
						alt="Foto de perfil"
						width={140}
						height={140}
						className="rounded-full max-w-[120px] max-h-[120px] object-cover border-4 border-blue-500"
						priority // opcional, para pré-carregar
					/>
				</div>

				{/* Info */}
				<div className="flex-1 w-full">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between">
						<div>
							<h2 className="text-2xl font-bold text-gray-800 dark:text-white">
								{profile.nome}
							</h2>
							<p className="text-gray-500 dark:text-gray-400 text-sm">
								@{profile.tag}
							</p>
						</div>

						<div className="flex flex-col gap-4">
							{profile.id === myprofile?.id && (
								<button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-full text-sm font-medium transition">
									Editar Perfil
								</button>
							)}

							<button
								onClick={() => {
									if (
										profile.followers.includes(
											myprofile?.id || ""
										)
									) {
										setFollowStatus(true);
										unfollow();
                                    } else {
                                        if (!myprofile) return router.push("/auth/login");
										setFollowStatus(true);
										follow();
									}
								}}
								disabled={loadFollow}
								className="mt-4 sm:mt-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-full text-sm font-medium transition"
							>
								{loadFollow && (
									<span
										className="inline-block w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"
										aria-label="Carregando"
									></span>
								)}
								{!loadFollow &&
									(profile.followers.includes(
										myprofile?.id || ""
									)
										? "Seguindo"
										: "Seguir")}
							</button>

							<button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-full text-sm font-medium transition">
								Compartilhar
							</button>
						</div>
					</div>

					<p className="mt-4 text-gray-700 dark:text-gray-300 text-sm break-all">
						{profile.bio}
					</p>

					{/* Estatísticas */}
					<div className="mt-6 grid grid-cols-3 gap-4 text-center">
						<div>
							<p className="text-blue-600 dark:text-blue-400 text-lg font-semibold">
								{profile.followers.length}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Seguidores
							</p>
						</div>
						<div>
							<p className="text-blue-600 dark:text-blue-400 text-lg font-semibold">
								{profile.following.length}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Seguindo
							</p>
						</div>
						<div>
							<p className="text-blue-600 dark:text-blue-400 text-lg font-semibold">
								{profile.posts.length}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Publicações
							</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6">
					📰 Publicações
				</h2>

				{profile.posts.length === 0 ? (
					<p className="text-gray-500 dark:text-gray-400">
						Nenhuma publicação encontrada.
					</p>
				) : (
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{profile.posts.map((post) => (
							<div
								key={post.id}
								className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-md transition-shadow p-4 flex flex-col"
							>
								{/* Imagem se existir */}
								{post.imageUrl && (
									<div className="mb-4 h-48 w-full relative rounded-lg overflow-hidden">
										<Image
											src={post.imageUrl}
											alt={post.titulo || "Post"}
											fill
											className="object-cover"
										/>
									</div>
								)}

								{/* Título do post */}
								{post.titulo && (
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
										{post.titulo}
									</h3>
								)}

								{/* Legenda */}
								{post.legenda && (
									<p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
										{post.legenda}
									</p>
								)}

								{/* Rodapé do card */}
								<div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
									<span>
										{new Date(
											post.createdAt
										).toLocaleDateString("pt-BR")}
									</span>
									<div className="flex gap-4 items-center">
										<span>
											❤️ {post.likes?.length ?? 0}
										</span>
										<span>
											💬 {post.comments?.length ?? 0}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

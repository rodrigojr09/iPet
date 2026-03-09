import { useAuth } from "@/hooks/useAuth";
import { useError } from "@/hooks/useError";
import { ProfileWithPosts } from "@/types/models";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function ProfilePage() {
	const router = useRouter();
	const { profile: myProfile } = useAuth();
	const error = useError();
	const [loadFollow, setFollowStatus] = useState(true);
	const [profile, setProfile] = useState<ProfileWithPosts>();

	const refresh = useCallback(async () => {
		if (!router.query.profile_tag) return;

		try {
			const res = await axios.get(
				`/api/profile/tag/${router.query.profile_tag}?posts=true`
			);
			setProfile(res.data);
		} catch (err) {
			console.error("Erro ao carregar perfil", err);
		} finally {
			setFollowStatus(false);
		}
	}, [router.query.profile_tag]);

	async function follow() {
		if (!profile || !myProfile) return;
		try {
			await axios.post(
				`/api/profile/${profile.id}/follow?profile_id=${myProfile.id}`
			);
			await refresh();
		} catch {
			error.throwError("Erro ao seguir perfil");
			setFollowStatus(false);
		}
	}

	async function unfollow() {
		if (!profile || !myProfile) return;
		try {
			await axios.post(
				`/api/profile/${profile.id}/unfollow?profile_id=${myProfile.id}`
			);
			await refresh();
		} catch {
			error.throwError("Erro ao deixar de seguir perfil");
			setFollowStatus(false);
		}
	}

	useEffect(() => {
		void refresh();
	}, [refresh]);

	if (!profile) return null;

	const isOwner = profile.id === myProfile?.id;
	const isFollowing = profile.followers.includes(myProfile?.id || "");

	return (
		<div className="max-w-5xl mx-auto px-4 md:py-10">
			<div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
				<div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]">
					<Image
						src={profile.foto || "/default-avatar.jpeg"}
						alt="Foto de perfil"
						width={140}
						height={140}
						className="rounded-full max-w-[120px] max-h-[120px] object-cover border-4 border-blue-500"
						priority
					/>
				</div>

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

						{!isOwner && (
							<button
								onClick={() => {
									if (!myProfile) {
										void router.push("/auth/login");
										return;
									}

									setFollowStatus(true);
									if (isFollowing) {
										void unfollow();
									} else {
										void follow();
									}
								}}
								disabled={loadFollow}
								className="mt-4 sm:mt-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-full text-sm font-medium transition disabled:opacity-70"
							>
								{loadFollow
									? "Carregando..."
									: isFollowing
										? "Seguindo"
										: "Seguir"}
							</button>
						)}
					</div>

					<p className="mt-4 text-gray-700 dark:text-gray-300 text-sm break-all">
						{profile.bio || "Sem bio cadastrada."}
					</p>

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
								Publicacoes
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-8">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
					Publicacoes
				</h2>

				{profile.posts.length === 0 ? (
					<p className="text-gray-500 dark:text-gray-400">
						Nenhuma publicacao encontrada.
					</p>
				) : (
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{profile.posts.map((post) => (
							<div
								key={post.id}
								className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-md transition-shadow p-4 flex flex-col"
							>
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

								{post.titulo && (
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
										{post.titulo}
									</h3>
								)}

								{post.legenda && (
									<p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
										{post.legenda}
									</p>
								)}

								<div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
									<span>
										{new Date(post.createdAt).toLocaleDateString("pt-BR")}
									</span>
									<div className="flex gap-4 items-center">
										<span>Curtidas {post.likes?.length ?? 0}</span>
										<span>Comentarios {post.comments?.length ?? 0}</span>
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

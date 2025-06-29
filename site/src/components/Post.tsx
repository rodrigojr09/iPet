import { Prisma } from "@prisma/client";
import Image from "next/image";

interface PostProps {
	post: Prisma.PostGetPayload<{ include: { author: true; comments: true } }>;
}

export default function Post({ post }: PostProps) {
	return (
		<div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow mb-6 w-1/2 mx-auto">
			{/* Header: Avatar e Nome */}
			<div className="flex items-center gap-4 mb-4">
				{post.author.foto ? (
					<div className="relative w-12 h-12 rounded-full overflow-hidden">
						<Image
							src={post.author.foto}
							alt={`Avatar de ${post.author.nome}`}
							fill
							className="object-cover"
						/>
					</div>
				) : (
					<div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold">
						{post.author.nome?.[0] || "?"}
					</div>
				)}
				<div>
					<p className="font-semibold text-gray-900 dark:text-white">
						{post.author.nome}
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						{new Date(post.createdAt).toLocaleDateString("pt-BR", {
							day: "2-digit",
							month: "short",
							year: "numeric",
						})}
					</p>
				</div>
			</div>

			{/* Conteúdo do post */}
			{post.titulo && (
				<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
					{post.titulo}
				</h3>
			)}

			{post.legenda && (
				<p className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-4">
					{post.legenda}
				</p>
			)}

			{/* Imagem */}
			{post.imageUrl && (
				<div className="relative max-w-90 h-90 mx-auto aspect-video rounded-lg overflow-hidden mb-4">
					<Image
						src={post.imageUrl}
						alt={`Imagem do post de ${post.author.nome}`}
						fill
						className="object-cover"
					/>
				</div>
			)}

			{/* Ações */}
			<div className="flex gap-8 text-gray-600 dark:text-gray-400 text-sm font-medium select-none">
				<button
					type="button"
					aria-label="Curtir post"
					className="flex items-center gap-1 hover:text-red-500 transition cursor-pointer"
				>
					❤️ <span>{post.likes?.length ?? 0}</span>
				</button>
				<button
					type="button"
					aria-label="Comentar no post"
					className="flex items-center gap-1 hover:text-blue-500 transition cursor-pointer"
				>
					💬 <span>{post.comments?.length ?? 0}</span>
				</button>
				<button
					type="button"
					aria-label="Compartilhar post"
					className="flex items-center gap-1 hover:text-green-500 transition cursor-pointer"
				>
					🔗 Compartilhar
				</button>
			</div>
		</div>
	);
}

import { Prisma } from "@prisma/client";
import Image from "next/image";

interface PostProps {
	post: Prisma.PostGetPayload<{ include: { author: true; comments: true } }>;
}

export default function Post({ post }: PostProps) {
	return (
		<div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-xl mx-auto mb-6 transition hover:scale-[1.01] duration-200">
			{/* Header */}
			<div className="flex items-center gap-4 mb-4">
				<div className="relative w-12 h-12">
					<Image
						src={post.author.foto || "/default-avatar.jpeg"}
						alt={`Avatar de ${post.author.nome}`}
						fill
						className="rounded-full object-cover border-2 border-blue-500 shadow"
					/>
				</div>
				<div>
					<p className="font-semibold text-white">
						{post.author.nome}
					</p>
					<p className="text-xs text-gray-400">
						{new Date(post.createdAt).toLocaleDateString("pt-BR", {
							day: "2-digit",
							month: "short",
							year: "numeric",
						})}
					</p>
				</div>
			</div>

			{/* Título */}
			{post.titulo && (
				<h3 className="text-lg font-bold text-blue-400 mb-1 flex items-center gap-2">
					📝 {post.titulo}
				</h3>
			)}

			{/* Legenda */}
			{post.legenda && (
				<p className="text-gray-300 whitespace-pre-line mb-4">
					{post.legenda}
				</p>
			)}

			{/* Imagem */}
			{post.imageUrl && (
				<div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 border border-gray-700">
					<Image
						src={post.imageUrl}
						alt={`Imagem do post de ${post.author.nome}`}
						fill
						className="object-cover object-center hover:scale-105 transition-transform duration-300"
					/>
				</div>
			)}

			{/* Ações */}
			<div className="flex gap-6 text-sm text-gray-400">
				<button className="flex items-center gap-1 hover:text-red-500 transition">
					❤️ {post.likes?.length ?? 0}
				</button>
				<button className="flex items-center gap-1 hover:text-blue-500 transition">
					💬 {post.comments?.length ?? 0}
				</button>
				<button className="flex items-center gap-1 hover:text-green-500 transition">
					🔗 Compartilhar
				</button>
			</div>
		</div>
	);
}

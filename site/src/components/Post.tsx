import { Prisma } from "@prisma/client";
import Image from "next/image";

interface PostProps {
	post: Prisma.PostGetPayload<{ include: { author: true } }>;
}

export default function     Post({ post }: PostProps) {
	return (
		<div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
			<div className="flex items-center gap-3 mb-2">
				<Image
					alt="avatar-pet"
					width={100}
					height={100}
					src={post.author.nome}
					className="w-10 h-10 rounded-full"
				/>
				<div>
					<p className="font-semibold">{post.author.nome}</p>
				</div>
			</div>
			<p className="mb-2">{post.content}</p>
			{post.imageUrl && (
				<Image
					width={1000}
					height={1000}
					alt="pet"
					src={post.imageUrl}
					className="rounded max-h-[45vh] w-auto"
				/>
			)}
			<div className="flex gap-4 mt-2 text-gray-600">
				❤️ Curtir | 💬 Comentar | 🔗 Compartilhar
			</div>
		</div>
	);
}

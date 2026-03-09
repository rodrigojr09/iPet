"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function PostNew({ handleClose }: { handleClose: () => void }) {
	const { profile } = useAuth();
	const [post, setPost] = useState({
		titulo: "",
		legenda: "",
		foto: null as File | null,
	});
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = e.target;
			setPost((prev) => ({ ...prev, [name]: value }));
		},
		[]
	);

	const handleFile = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { files } = e.target;
			if (files?.[0]) {
				if (previewUrl) URL.revokeObjectURL(previewUrl);
				setPost((prev) => ({ ...prev, foto: files[0] }));
				setPreviewUrl(URL.createObjectURL(files[0]));
			}
		},
		[previewUrl]
	);

	const handleSubmit = useCallback(() => {
		void (async () => {
			try {
				if (!profile?.id) {
					alert("Voce precisa estar logado para postar.");
					return;
				}

				const formData = new FormData();
				formData.append("titulo", post.titulo);
				formData.append("legenda", post.legenda);
				formData.append("authorId", profile.id);

				if (post.foto) {
					formData.append("foto", post.foto);
				}

				const res = await fetch("/api/post/new", {
					method: "POST",
					body: formData,
				});
				const data = await res.json();
				if (res.ok) {
					handleClose();
					location.reload();
				} else if (data.error) {
					alert(data.error);
				}
			} catch (error) {
				console.error(error);
			}
		})();
	}, [post, profile, handleClose]);

	return (
		<div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
			<h3 className="text-lg font-bold text-gray-800 dark:text-white">
				Criar novo post
			</h3>

			<input
				type="text"
				name="titulo"
				value={post.titulo}
				onChange={handleChange}
				placeholder="Titulo do post"
				className="w-full py-2 px-4 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			<textarea
				name="legenda"
				value={post.legenda}
				onChange={handleChange}
				placeholder="Escreva uma legenda..."
				rows={4}
				className="w-full py-2 px-4 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
			/>

			<div>
				<input
					type="file"
					id="file"
					accept="image/*"
					onChange={handleFile}
					className="hidden"
				/>
				<label
					htmlFor="file"
					className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
				>
					{post.foto ? "Alterar imagem" : "Adicionar imagem"}
				</label>

				{previewUrl && (
					<div className="mt-4 relative max-w-60 h-60 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
						<Image
							src={previewUrl}
							alt="Previa da imagem"
							fill
							className="object-cover"
						/>
					</div>
				)}
			</div>

			<div className="flex justify-between">
				<button
					onClick={handleSubmit}
					className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition"
				>
					Postar
				</button>
				<button
					onClick={handleClose}
					className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition"
				>
					Fechar
				</button>
			</div>
		</div>
	);
}

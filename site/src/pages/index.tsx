import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import moment from "moment-timezone";
import Feed from "@/components/Feed";
import PostNew from "@/components/PostNew";
import { useState } from "react";
export default function Home() {
	const { account, profile } = useAuth();
	const [postField, setPostField] = useState<boolean>(false);

	return (
		<main className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto py-6 px-4">
			{/* Feed Principal */}
			<section className="w-full md:flex-1 flex flex-col space-y-6">
				{postField ? (
					<PostNew handleClose={() => setPostField(false)} />
				) : (
					<button
						className="bg-blue-600 text-white px-4 py-2 w-full sm:w-1/2 md:w-1/3 mx-auto rounded-md hover:bg-blue-700 shadow text-sm"
						onClick={() => setPostField(true)}
					>
						Nova Postagem
					</button>
				)}

				<Feed />
			</section>

			{/* Sidebar Direita */}
			<aside className="hidden md:block w-full md:w-[280px] space-y-6">
				{/* Marketplace */}
				<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
					<h3 className="font-semibold text-lg mb-2">
						Marketplace 🛍️
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-300">
						Confira os melhores produtos para seu pet!
					</p>
					<button className="mt-3 text-blue-600 hover:underline text-sm">
						Ver mais
					</button>
				</div>

				{/* Clínicas */}
				<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
					<h3 className="font-semibold text-lg mb-2">
						Clínicas Veterinárias 🏥
					</h3>
					<ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
						<li className="flex justify-between items-center">
							<span>🐾 PetCare – ⭐ 4.8</span>
							<button className="text-blue-500 hover:underline">
								Agendar
							</button>
						</li>
						<li className="flex justify-between items-center">
							<span>🐾 Vet Amigo – ⭐ 4.6</span>
							<button className="text-blue-500 hover:underline">
								Agendar
							</button>
						</li>
					</ul>
				</div>

				{/* Meus Pets */}
				{account && (
					<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
						<h3 className="font-semibold text-lg mb-2">
							Meus Pets 🐾
						</h3>
						<div className="space-y-4">
							{account.profiles.map((pet) => (
								<div
									key={pet.id}
									className="flex items-center gap-3"
								>
									<div className="w-10 h-10 relative">
										<Image
											alt="avatar-pet"
											src={
												pet.foto ||
												"/default-avatar.jpeg"
											}
											fill
											className="rounded-full object-cover"
											sizes="40px"
										/>
									</div>
									<div>
										<p className="font-medium text-gray-800 dark:text-white">
											{pet.nome}
										</p>
										<p className="text-sm text-gray-500">
											{moment().diff(
												pet.nascimento,
												"years"
											)}{" "}
											anos
										</p>
									</div>
								</div>
							))}
						</div>
						<button className="mt-4 text-blue-600 hover:underline text-sm">
							Adicionar Pet
						</button>
					</div>
				)}
			</aside>
		</main>
	);
}

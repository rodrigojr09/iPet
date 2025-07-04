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
		<main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
			{/*<!-- Feed -->*/}
			<section className="lg:col-span-2 flex flex-col gap-6">
				{postField ? (
					<PostNew handleClose={() => setPostField(false)} />
				) : (
					<button
						className="bg-blue-600 text-white px-4 py-1 mx-auto w-1/2 rounded hover:bg-blue-700"
						onClick={() => setPostField(true)}
					>
						Nova Postagem
					</button>
				)}

				<Feed />
			</section>

			{/*<!-- Sidebar -->*/}
			<aside className="space-y-6">
				{/*<!-- Marketplace -->*/}
				<div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
					<h3 className="font-semibold mb-2">Marketplace 🛍️</h3>
					<p>Confira os melhores produtos para seu pet!</p>
					<button className="mt-2 text-blue-600 hover:underline">
						Ver mais
					</button>
				</div>

				{/*<!-- Clínicas -->*/}
				<div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
					<h3 className="font-semibold mb-2">
						Clínicas Veterinárias 🏥
					</h3>
					<ul className="space-y-1 text-sm">
						<li>
							🐾 PetCare – ⭐ 4.8
							<button className="ml-2 text-blue-500 hover:underline">
								Agendar
							</button>
						</li>
						<li>
							🐾 Vet Amigo – ⭐ 4.6
							<button className="ml-2 text-blue-500 hover:underline">
								Agendar
							</button>
						</li>
					</ul>
				</div>

				{/*<!-- Meus Pet -->*/}
				{account && (
					<div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
						<h3 className="font-semibold mb-2">Meus Pet 🐾</h3>
						{account.profiles.map((pet) => (
							<div
								key={pet.id}
								className="flex items-center gap-2"
							>
								<div className="w-10 h-10 relative">
									<Image
										alt="avatar-pet"
										src={pet.foto}
										fill
										className="rounded-full object-cover"
										sizes="40px"
									/>
								</div>

								<div>
									<p className="font-medium">{pet.nome}</p>
									<p className="text-sm text-gray-500">
										{moment().diff(pet.nascimento, "years")}{" "}
										anos
									</p>
								</div>
							</div>
						))}
						<button className="mt-2 text-blue-600 hover:underline">
							Adicionar Pet
						</button>
					</div>
				)}
			</aside>
		</main>
	);
}

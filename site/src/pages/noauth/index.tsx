import Navbar from "@/components/Navbar";
import { account } from "@/defaultData";
import Image from "next/image";
import Link from "next/link";

export default function HomeNoAuth() {
	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
			<Navbar isAuth={false} />

			<main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Feed */}
				<section className="lg:col-span-2">
					{/* Post de exemplo */}
					<div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
						<div className="flex items-center gap-3 mb-2">
							<Image
								alt="avatar-pet"
								width={100}
								height={100}
								src={account.pet.foto}
								className="w-10 h-10 rounded-full object-cover"
							/>
							<div>
								<p className="font-semibold">
									{account.pet.nome}
								</p>
								<p className="text-sm text-gray-500">
									com {account.nome}
								</p>
							</div>
						</div>
						<p className="mb-2">Curtindo o parque hoje!</p>
						<Image
							width={1000}
							height={1000}
							alt="pet"
							src={
								"https://sdmntprwestus3.oaiusercontent.com/files/00000000-b8c4-61fd-8557-11779115872c/raw?se=2025-05-21T05%3A49%3A14Z&sp=r&sv=2024-08-04&sr=b&scid=0108065d-cb26-5a08-bf1c-8769a1fe44ef&skoid=c953efd6-2ae8-41b4-a6d6-34b1475ac07c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-20T22%3A32%3A29Z&ske=2025-05-21T22%3A32%3A29Z&sks=b&skv=2024-08-04&sig=TdBMcqrSyZhNDTpknvHoxqXORRc7MvtFy3uX66OiUBE%3D"
							}
							className="rounded max-h-[45vh] w-auto"
						/>
						<div className="flex gap-4 mt-2 text-gray-600 text-sm">
							❤️ Curtir | 💬 Comentar | 🔗 Compartilhar
						</div>
					</div>
				</section>

				{/* Sidebar */}
				<aside className="space-y-6">
					{/* Marketplace */}
					<div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
						<h3 className="font-semibold mb-2">Marketplace 🛍️</h3>
						<p>Confira os melhores produtos para seu pet!</p>
						<Link
							href="/login"
							className="mt-2 block text-blue-600 hover:underline text-sm"
						>
							Faça login para explorar
						</Link>
					</div>

					{/* Clínicas */}
					<div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
						<h3 className="font-semibold mb-2">
							Clínicas Veterinárias 🏥
						</h3>
						<ul className="space-y-1 text-sm">
							<li>
								🐾 PetCare – ⭐ 4.8
								<Link
									href="/login"
									className="ml-2 text-blue-500 hover:underline"
								>
									Faça login
								</Link>
							</li>
							<li>
								🐾 Vet Amigo – ⭐ 4.6
								<Link
									href="/login"
									className="ml-2 text-blue-500 hover:underline"
								>
									Faça login
								</Link>
							</li>
						</ul>
					</div>
				</aside>
			</main>
		</div>
	);
}

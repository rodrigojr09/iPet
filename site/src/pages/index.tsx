import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export default function Home() {
	const { account, profile } = useAuth();
	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
			<Navbar />
			<main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/*<!-- Feed -->*/}
				<section className="lg:col-span-2">
					<div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
						<textarea
							className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
							placeholder="Compartilhe algo sobre seu pet..."
						></textarea>
						<div className="mt-2 flex justify-end">
							<button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
								Postar
							</button>
						</div>
					</div>

					{/*<!-- Post exemplo -->*    
					<div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
						<div className="flex items-center gap-3 mb-2">
							<Image
								alt="avatar-pet"
								width={100}
								height={100}
								src={profile.foto}
								className="w-10 h-10 rounded-full"
							/>
							<div>
								<p className="font-semibold">{profile.nome}</p>
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
						<div className="flex gap-4 mt-2 text-gray-600">
							❤️ Curtir | 💬 Comentar | 🔗 Compartilhar
						</div>
					</div>
                    */}
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

					{/*<!-- Meu Pet -->*/}
					<div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
						<h3 className="font-semibold mb-2">Meu Pet 🐾</h3>
						<div className="flex items-center gap-2">
							{/*<Image
								alt="avatar-pet"
								width={100}
								height={100}
								src={profile.nome}
								className="w-10 h-10 rounded-full"
                            />
                            */}
							<div>
								<p className="font-medium">{""}</p>
								<p className="text-sm text-gray-500">
									{""} anos
								</p>
							</div>
						</div>
						<button className="mt-2 text-blue-600 hover:underline">
							Ver histórico
						</button>
					</div>
				</aside>
			</main>
		</div>
	);
}

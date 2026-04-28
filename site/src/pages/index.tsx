import Feed from "@/components/Feed";
import PostNew from "@/components/PostNew";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import moment from "moment-timezone";
import { useState } from "react";

export default function Home() {
	const { account } = useAuth();
	const [postField, setPostField] = useState(false);

	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f7f1eb] via-[#fffaf6] to-[#f3e7dc]">
			<div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto py-6 px-4">
				{/* Main Feed Section */}
				<section className="w-full lg:flex-1 flex flex-col space-y-6">
					{/* Post Button */}
					{account &&
						(postField ? (
							<PostNew handleClose={() => setPostField(false)} />
						) : (
							<button
								className="w-full rounded-[16px] border-2 border-dashed border-[#d8c9bc] bg-white px-6 py-4 text-[#5f4a3f] font-semibold transition-all duration-200 hover:border-[#d77a42] hover:bg-[#fffdf9] hover:text-[#d77a42] shadow-sm"
								onClick={() => setPostField(true)}
							>
								+ Compartilhar um momento com seu pet
							</button>
						))}

					{/* Example Post */}
					<div className="bg-white rounded-[16px] border border-[#e0d1c3] shadow-[0_4px_16px_rgba(92,64,42,0.08)] overflow-hidden hover:shadow-[0_8px_24px_rgba(92,64,42,0.12)] transition-shadow">
						{/* Post Header */}
						<div className="p-5 border-b border-[#e0d1c3] flex items-center gap-3">
							<div className="w-12 h-12 relative">
								<Image
									alt="avatar"
									src="/default-avatar.jpeg"
									fill
									className="rounded-full object-cover"
									sizes="48px"
								/>
							</div>
							<div className="flex-1">
								<p className="font-semibold text-[#4b382d]">Comunidade iPet</p>
								<p className="text-xs text-[#9b7b65]">Agora</p>
							</div>
						</div>

						{/* Post Content */}
						<div className="p-5 space-y-3">
							<p className="text-sm text-[#6e5748] leading-relaxed">
								Bem-vindo ao iPet! 🐾 Um lugar especial para compartilhar os momentos mais adoráveis do seu pet com uma comunidade apaixonada por animais. Conecte-se, inspire-se e divirta-se!
							</p>
							<div className="relative w-full h-64 overflow-hidden rounded-[12px] bg-[#f7f1eb]">
								<Image
									src="/pets-banner.jpg"
									alt="Post"
									fill
									className="object-cover hover:scale-105 transition-transform duration-300"
								/>
							</div>
						</div>

						{/* Post Footer */}
						<div className="px-5 py-4 border-t border-[#e0d1c3] flex items-center justify-between text-sm text-[#9b7b65]">
							<span>❤️ 142 curtidas</span>
							<span>💬 28 comentários</span>
							<span>📤 Compartilhar</span>
						</div>
					</div>

					{/* Feed Component */}
					<Feed />
				</section>

				{/* Sidebar */}
				<aside className="hidden lg:block w-full lg:w-[320px] space-y-6 h-fit sticky top-6">
					{/* Marketplace Card */}
					<div className="bg-white rounded-[16px] border border-[#e0d1c3] p-6 shadow-[0_4px_16px_rgba(92,64,42,0.08)]">
						<div className="mb-3 inline-block">
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7b65]">
								Marketplace
							</p>
						</div>
						<h3 className="font-black text-lg text-[#4b382d] mb-2">Produtos para seu pet</h3>
						<p className="text-sm text-[#6e5748] leading-relaxed">
							Confira os melhores produtos e acessórios selecionados para seu pet.
						</p>
						<button className="mt-4 w-full rounded-lg bg-[#d77a42] text-white px-4 py-2 text-sm font-semibold transition-all hover:bg-[#c66a32] hover:shadow-[0_4px_12px_rgba(215,122,66,0.2)]">
							Explorar
						</button>
					</div>

					{/* Veterinary Clinics Card */}
					<div className="bg-white rounded-[16px] border border-[#e0d1c3] p-6 shadow-[0_4px_16px_rgba(92,64,42,0.08)]">
						<div className="mb-3 inline-block">
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7b65]">
								Saúde
							</p>
						</div>
						<h3 className="font-black text-lg text-[#4b382d] mb-4">Clínicas veterinárias</h3>
						<div className="space-y-3">
							<div className="p-3 bg-[#fffdf9] rounded-lg border border-[#e0d1c3]">
								<p className="font-semibold text-sm text-[#4b382d]">PetCare Clínica</p>
								<p className="text-xs text-[#9b7b65]">⭐ 4.8 • Agendar</p>
							</div>
							<div className="p-3 bg-[#fffdf9] rounded-lg border border-[#e0d1c3]">
								<p className="font-semibold text-sm text-[#4b382d]">Vet Amigo</p>
								<p className="text-xs text-[#9b7b65]">⭐ 4.6 • Agendar</p>
							</div>
						</div>
					</div>

					{/* My Pets Card */}
					{account && (
						<div className="bg-white rounded-[16px] border border-[#e0d1c3] p-6 shadow-[0_4px_16px_rgba(92,64,42,0.08)]">
							<div className="mb-3 inline-block">
								<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7b65]">
									Perfil
								</p>
							</div>
							<h3 className="font-black text-lg text-[#4b382d] mb-4">Meus pets</h3>
							<div className="space-y-4">
								{account.profiles.map((pet) => (
									<div key={pet.id} className="flex items-center gap-3 p-3 bg-[#fffdf9] rounded-lg border border-[#e0d1c3] hover:border-[#d77a42] transition-colors">
										<div className="w-12 h-12 relative flex-shrink-0">
											<Image
												alt="avatar-pet"
												src={pet.foto || "/default-avatar.jpeg"}
												fill
												className="rounded-full object-cover"
												sizes="48px"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<p className="font-semibold text-[#4b382d] truncate">
												{pet.nome}
											</p>
											<p className="text-xs text-[#9b7b65]">
												{moment().diff(pet.nascimento, "years")} anos • {pet.raca}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</aside>
			</div>
		</main>
	);
}

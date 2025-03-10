import Navbar from "@/components/Navbar";
import PetImage from "@/components/PetImage";
import { FaPaw, FaStethoscope, FaUsers } from "react-icons/fa6";

export default function Home() {
	return (
		<div className="flex flex-col h-screen bg-indigo-700 text-white pt-16">
			{/* Header section */}
			<Navbar />

			{/* Main content */}
			<main className="flex flex-col md:flex-row items-center justify-center min-h-[60vh] flex-grow p-8 md:px-16">
				{/* Pet image */}
				<div className="w-full md:w-1/2">
					<PetImage />
				</div>

				{/* Description */}
				<div className="w-full md:w-1/2 p-4 text-center md:text-left">
					<h2 className="text-3xl font-semibold mb-4 text-white">
						Bem-vindo ao iPet
					</h2>
					<p className="text-lg mb-6">
						O iPet é uma plataforma que funciona como uma rede
						social voltada para pets. Os usuários podem compartilhar
						mídias dos seus pets e acessar páginas com informações e
						recursos úteis para atender às necessidades dos animais
						de estimação.
					</p>
					<a
						href="#sobre"
						className="inline-block bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg text-lg font-semibold transition-all"
					>
						Saiba mais
					</a>
				</div>
			</main>

			{/* About Section */}
			<section
				className="flex flex-col md:flex-row items-center justify-center flex-grow p-8 bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-600 text-white"
				id="sobre"
			>
				<div className="text-center md:text-left w-full md:w-3/4 px-4 py-8 rounded-lg bg-indigo-900 shadow-lg">
					<h1 className="text-4xl font-extrabold mb-4">Sobre Nós</h1>
					<p className="text-lg mb-6">
						O iPet nasceu com o objetivo de criar uma comunidade
						interativa e acolhedora para todos os amantes de pets.
						Em um mundo onde os animais de estimação fazem parte
						integral das nossas famílias, a plataforma visa fornecer
						um espaço único onde donos de pets, profissionais da
						área e apaixonados por animais possam se conectar,
						compartilhar experiências e aprender juntos.
					</p>
					<p className="text-lg">
						Nosso foco é proporcionar uma experiência social que vai
						além da troca de fotos e vídeos dos animais. O iPet
						permite que você descubra informações valiosas sobre
						cuidados com seus pets, tenha acesso a recomendações de
						clínicas veterinárias e mercados pet, além de participar
						de discussões sobre os mais diversos assuntos
						relacionados ao bem-estar animal.
					</p>
				</div>
			</section>

			{/* What We Do Section */}
			<section
				className="py-12 px-4 bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500"
				id="o-que-fazemos"
			>
				<div className="max-w-6xl mx-auto text-center md:text-left">
					<h2 className="text-4xl font-extrabold text-white mb-6">
						O que fazemos?
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-indigo-900 p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:bg-indigo-800">
							<div className="text-3xl text-pink-500 mb-4">
								<FaUsers />
								{/* Icone de pessoas */}
							</div>
							<h3 className="text-2xl font-semibold text-white mb-4">
								Conectamos donos de pets
							</h3>
							<p className="text-lg text-white">
								Um lugar onde você pode compartilhar momentos
								especiais com seus animais e encontrar outros
								apaixonados por pets.
							</p>
						</div>
						<div className="bg-indigo-900 p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:bg-indigo-800">
							<div className="text-3xl text-pink-500 mb-4">
								<FaStethoscope />
								{/* Ícone de veterinário */}
							</div>
							<h3 className="text-2xl font-semibold text-white mb-4">
								Apoio aos profissionais da área pet
							</h3>
							<p className="text-lg text-white">
								Facilitamos a divulgação de clínicas
								veterinárias, pet shops e outros serviços
								especializados para garantir que os donos tenham
								acesso fácil a profissionais confiáveis.
							</p>
						</div>
						<div className="bg-indigo-900 p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:bg-indigo-800">
							<div className="text-3xl text-pink-500 mb-4">
								<FaPaw />
							</div>
							<h3 className="text-2xl font-semibold text-white mb-4">
								Comodidade e recursos úteis
							</h3>
							<p className="text-lg text-white">
								Oferecemos um conjunto de ferramentas e
								informações que ajudam os donos a atender melhor
								as necessidades dos seus animais de estimação,
								promovendo uma convivência mais saudável e
								feliz.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-indigo-800 text-center py-4 mt-auto">
				<p className="text-sm text-white">
					&copy; {new Date().getFullYear()} iPet - Todos os direitos
					reservados
				</p>
			</footer>
		</div>
	);
}

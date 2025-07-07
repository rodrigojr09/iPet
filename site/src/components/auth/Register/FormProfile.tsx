import { ProfileProps } from "@/pages/auth/register2";
import Input from "./Input";
import Image from "next/image";

interface FormProps {
	profile: ProfileProps;
	handleChangeProfile: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormProfile({
	profile,
	handleChangeProfile,
	handleFile,
}: FormProps) {
	return (
		<div className="max-w-md mx-auto w-full">
			<div className="flex flex-col items-center gap-4 mb-10">
				<label htmlFor="foto" className="relative w-[80px] h-[80px]">
					<Image
						src={
							profile.foto
								? URL.createObjectURL(profile.foto)
								: "/default-avatar.jpeg" // imagem padrão, adicione à pasta public/
						}
						alt="Avatar"
						fill
						className="object-cover rounded-full border-2 border-white shadow-md"
					/>
				</label>

				<input
					type="file"
					onChange={handleFile}
					className="hidden"
					id="foto"
					accept="image/*"
				/>
			</div>
			<Input
				value={profile.nome}
				type="text"
				id="nome"
				placeholder="Nome"
				onChange={handleChangeProfile}
			/>
			<Input
				value={profile.tag}
				type="text"
				id="tag"
				placeholder="Tag"
				onChange={handleChangeProfile}
			/>
			<Input
				value={profile.nascimento}
				type="date"
				id="nascimento"
				placeholder=" "
				onChange={handleChangeProfile}
			/>
			<Input
				value={profile.raca}
				type="text"
				id="raca"
				placeholder="Raça"
				onChange={handleChangeProfile}
			/>
		</div>
	);
}

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

/**
 * A React functional component that fetches and displays a random pet image.
 *
 * This component uses `useEffect` to make an API call to fetch a cat image when the component mounts.
 * While the image is being loaded, it displays a loading message. Once the image is fetched, it is displayed
 * using the `next/image` component with specific styling and animation effects. If fetching the image fails,
 * an error message is logged to the console and a fallback message is shown.
 *
 * @returns {JSX.Element} A loading message, the pet image, or a fallback message if the image is unavailable.
 */

const PetImage = () => {
	const [image, setImage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		// Função para buscar imagem de pet
		const fetchPetImage = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					"https://api.thecatapi.com/v1/images/search"
				); // ou use a URL da API de cachorros
				setImage(response.data[0].url);
			} catch (error) {
				console.error("Erro ao buscar imagem de pet:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPetImage();
	}, []); // A dependência vazia faz com que a requisição seja feita apenas uma vez quando o componente for montado

	if (loading) {
		return <div>Carregando...</div>;
	}

	return image ? (
		<Image
			width={1000}
			height={1000}
			src={image}
			alt="Pet"
			className="rounded-lg shadow-lg h-1/2 w-1/2 m-auto hover:scale-x-125 hover:scale-y-110 duration-500"
		/>
	) : (
		<p>Imagem não disponível</p>
	);
};

export default PetImage;

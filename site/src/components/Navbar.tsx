import { account } from "@/defaultData";
import Image from "next/image";

export default function Navbar() {
	return (
		<nav className="bg-white dark:bg-gray-800 px-6 py-3 flex justify-between items-center shadow">
			<div className="text-xl font-bold">iPet</div>
			<div className="flex gap-6 items-center">
				<a href="/feed" className="hover:underline">
					Feed
				</a>
				<a href="/marketplace" className="hover:underline">
					Marketplace
				</a>
				<a href="/clinicas" className="hover:underline">
					Clínicas
				</a>
				<a href="/mypet" className="hover:underline">
					Meu Pet
				</a>
				<button className="relative">
					🔔
					<span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
						3
					</span>
				</button>
				<Image
                    src={account.avatar}
                    width={100}
                    height={100}
					alt="avatar"
					className="w-8 h-8 rounded-full"
				/>
			</div>
		</nav>
	);
}

import { ButtonHTMLAttributes } from "react";

interface MRButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: undefined;
}

export default function MRButton({ children, ...props }: MRButtonProps) {
	return (
		<button
			{...props}
			className="w-full bg-pink-600 hover:bg-pink-700 transition-all py-3 rounded-lg text-lg font-semibold"
		>
			{children}
		</button>
	);
}

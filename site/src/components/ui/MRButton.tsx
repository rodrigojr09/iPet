import { ButtonHTMLAttributes } from "react";

interface MRButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: undefined;
}

/**
 * A button component with customizable props and styling.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the button.
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} props - Additional props for the button element.
 *
 * @returns {JSX.Element} - The button component.
 */

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

interface MRInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	value: string;
	setValue: (e: string) => void;
}

export default function MRInput({
	label,
	error,
	value,
	setValue,
	...props
}: MRInputProps) {
	return (
		<div className="w-full">
			{label && (
				<label className="block text-lg font-medium text-white">
					{label}
				</label>
			)}
			<input
				{...props}
				value={value}
				onChange={(e) => setValue && setValue(e.target.value)}
				className={`w-full p-3 mt-1 rounded-lg bg-indigo-800 border ${
					error ? "border-red-500" : "border-indigo-600"
				} focus:ring-2 focus:outline-none ${
					error ? "focus:ring-red-500" : "focus:ring-pink-500"
				} text-white`}
			/>
			{error && <p className="text-red-400 text-sm mt-1">{error}</p>}
		</div>
	);
}

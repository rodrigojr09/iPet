interface MRInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	value: string;
	setValue: (e: string) => void;
}

/**
 * A input component with a label and error handling.
 *
 * @param {string} [label] - The label of the input.
 * @param {string} [error] - The error message of the input.
 * @param {string} value - The value of the input.
 * @param {(e: string) => void} setValue - The function to set the value of the input.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} [props] - Other props to pass to the input element.
 *
 * @returns {React.ReactElement} - The input component.
 */
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
				<label
					id={props.id}
					className="block text-lg font-medium text-white"
				>
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

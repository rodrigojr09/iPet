interface Props {
	value: string;
	type: string;
	id: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
	value,
	onChange,
	type,
	id,
	placeholder,
}: Props) {
	return (
		<div className="relative flex flex-col mb-10 h-10">
			<input
				id={id}
				name={id}
				type={type}
				placeholder={placeholder}
				required
				value={value}
				onChange={onChange}
				className="peer h-full w-full border-b-2 border-gray-300 bg-transparent px-2 text-lg text-[#5753b5] placeholder-transparent focus:border-[#5c6ccd] focus:outline-none"
			/>
			<label
				htmlFor={id}
				className={`absolute left-2 text-[#7a78a9] text-base transition-all duration-200
            peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-[#5753b5]
            peer-focus:top-[-0.8rem] peer-focus:text-sm peer-focus:text-[#5c6ccd]
            ${
				value.trim() !== ""
					? "top-[-0.8rem] text-sm text-[#5c6ccd]"
					: "top-2"
			}`}
			>
				{placeholder}
			</label>
		</div>
	);
}

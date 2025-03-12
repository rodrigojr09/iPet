/**
 * A basic card component with a max width and some basic styling.
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export default function MRCard({ children }: { children: React.ReactNode }) {
	return (
        <div className="w-full max-w-md bg-indigo-900 p-8 rounded-lg shadow-lg">
            {children}
        </div>
	);
}

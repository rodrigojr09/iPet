import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, PanelTopClose, XCircle } from "lucide-react";
import React from "react";

type Props = {
	message: string | null;
	onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({ message, onClose }) => {
	return (
		<AnimatePresence>
			{message && (
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 40 }}
					transition={{ duration: 0.3 }}
					className="fixed top-5 right-5 z-20 bg-zinc-900 text-white flex rounded-xl shadow-lg border border-zinc-700 w-[280px] p-4"
				>
					<div className="flex flex-1 flex-col">
						<p className="text-sm font-semibold mb-1">Erro</p>
						<div className="flex items-center gap-2">
							<XCircle className="text-red-500" size={16} />
							<p className="text-xs text-zinc-400 flex-1">
								{message}
							</p>
						</div>
					</div>

					<div className="flex justify-end">
						<button
							onClick={onClose}
							className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-2 py-1.5 rounded-full transition"
						>
							<ChevronRight/>
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

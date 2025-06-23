import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
} from "react";
import { ErrorNotification } from "@/components/ErrorNotification";

type ErrorContextType = {
	throwError: (message: string) => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
	const [error, setError] = useState<string | null>(null);

	const throwError = useCallback((message: string) => {
		setError(message);
	}, []);

	const closeError = () => setError(null);

	return (
		<ErrorContext.Provider value={{ throwError }}>
			{children}
			<ErrorNotification message={error} onClose={closeError} />
		</ErrorContext.Provider>
	);
}

export function useError() {
	const context = useContext(ErrorContext);
	if (!context) {
		throw new Error("useError must be used within an ErrorProvider");
	}
	return context;
}

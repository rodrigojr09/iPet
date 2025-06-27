import AuthProvider from "@/hooks/useAuth";
import { ErrorProvider } from "@/hooks/useError";
import "@/styles/globals.css";
import "@/styles/auth/login.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ErrorProvider>
			<SessionProvider>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</SessionProvider>
		</ErrorProvider>
	);
}

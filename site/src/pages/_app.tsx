import "@/styles/globals.css";
import "@/styles/auth/login.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import AuthProvider from "@/hooks/useAuth";
import { ErrorProvider } from "@/hooks/useError";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const hideNavbar = router.pathname.startsWith("/auth/");

	return (
		<ErrorProvider>
			<SessionProvider session={pageProps.session}>
				<AuthProvider>
					{!hideNavbar && <Navbar />}
					<Component {...pageProps} />
				</AuthProvider>
			</SessionProvider>
		</ErrorProvider>
	);
}

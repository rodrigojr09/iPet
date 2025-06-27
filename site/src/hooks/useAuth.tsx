import { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { AuthProps } from "../../types/AuthProvider";
import axios from "axios";
import { Account, Profile } from "@prisma/client";
import { useRouter } from "next/router";

const AuthContext = createContext<AuthProps | undefined>(undefined);

export default function AuthProvider({ children }: any) {
	const { data, status } = useSession();
	const router = useRouter();
	const [account, setAccount] = useState<AuthProps["account"] | undefined>();
	const [profile, setProfile] = useState<AuthProps["profile"] | undefined>();

	const teste = ["/auth/login", "/auth/register"].filter((path) =>
		router.asPath.startsWith(path)
	);

	useEffect(() => {
		if (status === "authenticated") {
			(async () => {
				const res = await axios.get(
					`/api/user/${data.user.id}?profiles=true`
				);
				setAccount(res.data);
				setProfile(res.data.profiles[0]);
			})();
		}
	}, [data?.user.id, status]);

	useEffect(() => {
		if (teste.length !== 0) router.push("/");
	}, [router.asPath, teste,router.push]);

	function enter(profile_id: string) {}

	function logout() {
		signOut();
	}

	if (teste.length === 0 && status !== "loading")
		return (
			<AuthContext.Provider value={{ account, profile, enter, logout }}>
				{children}
			</AuthContext.Provider>
		);
	return null;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
}

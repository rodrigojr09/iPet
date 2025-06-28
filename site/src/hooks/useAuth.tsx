import { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { AuthProps } from "../../types/AuthProvider";
import axios from "axios";
import { Account, Profile } from "@prisma/client";
import { useRouter } from "next/router";
import { BoneIcon } from "lucide-react";

const AuthContext = createContext<AuthProps | undefined>(undefined);

export default function AuthProvider({ children }: any) {
	const { data, status } = useSession();
	const router = useRouter();
	const [account, setAccount] = useState<AuthProps["account"] | undefined>();
	const [profile, setProfile] = useState<AuthProps["profile"] | undefined>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (status === "authenticated") {
			(async () => {
				const res = await axios.get(
					`/api/user/${data.user.id}?profiles=true`
				);
				setAccount(res.data);
				setProfile(res.data.profiles[0]);
				setLoading(false);
			})();
		} else if (status === "unauthenticated") {
			setLoading(false);
		}
	}, [data?.user.id, status]);

	useEffect(() => {
		if (
			router.asPath.startsWith("/auth/login") ||
			router.asPath.startsWith("/auth/register")
		) {
			if (status === "authenticated") {
				router.push("/");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.asPath]);

	function enter(profile_id: string) {}

	function logout() {
		signOut();
	}

	if (!loading)
		return (
			<AuthContext.Provider
				value={{ account, profile, enter, logout, status: loading }}
			>
				{children}
			</AuthContext.Provider>
		);
    return <div className="w-screen h-screen items-center flex justify-center">
        <BoneIcon width={100} height={100}  className="animate-spin duration-1000" />
    </div>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
}

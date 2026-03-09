import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { AuthProps } from "../../types/AuthProvider";
import axios from "axios";
import { useRouter } from "next/router";
import { BoneIcon } from "lucide-react";

const AuthContext = createContext<AuthProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
	const { data, status } = useSession();
	const router = useRouter();
	const [account, setAccount] = useState<AuthProps["account"] | undefined>();
	const [profile, setProfile] = useState<AuthProps["profile"] | undefined>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;

		if (status === "authenticated") {
			void (async () => {
				try {
					const res = await axios.get(
						`/api/user/${data.user.id}?profiles=true`
					);
					if (cancelled) return;
					setAccount(res.data);
					setProfile(res.data.profiles?.[0]);
					setLoading(false);
				} catch (err: any) {
					if (cancelled) return;
					if (err.response?.status === 404) {
						await signOut().then(() => {
							setLoading(false);
						});
					} else {
						setLoading(false);
					}
				}
			})();
		} else if (status === "unauthenticated") {
			setAccount(undefined);
			setProfile(undefined);
			setLoading(false);
		}

		return () => {
			cancelled = true;
		};
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

	function enter(profile_id: string) {
		const selectedProfile =
			account?.profiles.find((item) => item.id === profile_id) || profile;
		setProfile(selectedProfile);
	}

	function logout() {
		void signOut();
	}

	if (!loading)
		return (
			<AuthContext.Provider
				value={{ account, profile, enter, logout, status: !loading }}
			>
				{children}
			</AuthContext.Provider>
		);
	return (
		<div className="w-screen h-screen items-center flex justify-center">
			<BoneIcon
				width={100}
				height={100}
				className="animate-spin duration-1000"
			/>
		</div>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
}

import { createContext, useContext, useEffect, useState } from "react";
import { Account, Profile } from "../../types";
import { signIn, signOut, useSession } from "next-auth/react";
import { AuthProps } from "../../types/AuthProvider";
import axios from "axios";

const AuthContext = createContext<AuthProps | undefined>(undefined);

export default function AuthProvider({ children }: any) {
	const { data, status } = useSession();
	const [account, setAccount] = useState<Account | undefined>();
	const [profile, setProfile] = useState<Profile | undefined>();

	const isLoggedIn = !!account;
	const hasProfile = !!profile;

    useEffect(() => {
        console.log(data?.user.id);
		if (status === "authenticated") {
			(async () => {
				const res = await axios.get(
					`/api/user/${data.user.id}`
				);
				setAccount(res.data.account);
				setProfile(res.data.profile);
			})();
		}
	}, [data?.user.id, status]);

	function enter(profile_id: string) {}

	function logout() {
		signOut();
	}

	function register(account: Account) {
		axios
			.post(`${process.env.NEXTAUTH_URL}/api/user/register`, account)
			.then((res) => console.log(res));
	}

	return (
		<AuthContext.Provider
			value={{ account, profile, enter, logout, register }}
		>
			{(!isLoggedIn || (isLoggedIn && hasProfile)) && children}
			{isLoggedIn && !hasProfile && (
				<ChoiceProfile profiles={account?.profiles || []} />
			)}
		</AuthContext.Provider>
	);
}

export function ChoiceProfile({ profiles }: { profiles: Profile[] }) {
	const { enter } = useAuth();
	const [loading, setLoading] = useState(false);

	function handleSelectProfile(profileId: string) {
		setLoading(true);
		// Aqui você pode chamar API, etc, se quiser
		enter(profileId);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
			<div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
				<h1 className="text-2xl font-bold mb-6">Escolha um perfil</h1>
				<div className="space-y-4">
					{profiles.map((profile) => (
						<button
							key={profile.id}
							onClick={() => handleSelectProfile(profile.id)}
							className="w-full bg-[#ff4b2b] text-white font-semibold py-3 rounded-lg shadow hover:bg-[#e04324] transition-colors"
							disabled={loading}
						>
							{profile.nome} – {profile.raca}
						</button>
					))}
				</div>
			</div>
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

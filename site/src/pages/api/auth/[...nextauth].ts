import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Senha", type: "password" },
			},
            async authorize(credentials) {
                console.log(credentials)
				if (!credentials?.email || !credentials?.password) return null;

				const res = await fetch(
					`${process.env.NEXTAUTH_URL}/api/user/login`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password,
						}),
					}
				);

                const user = await res.json();
				if (res.ok && user) return user;
				return null;
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {
		async jwt({ token, user }: any) {
            if (user) token.user = user;
            console.log(user)
			return token;
		},
		async session({ session, token }: any) {
			if (token?.user) session.user = token.user;
			return session;
		},
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
};

export default NextAuth(authOptions as any);

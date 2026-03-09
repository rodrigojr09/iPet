import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";
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
				if (!credentials?.email || !credentials?.password) return null;

				const user = await prisma.account.findUnique({
					where: { email: credentials.email },
				});
				if (!user) return null;

				const isValidPassword = await bcrypt.compare(
					credentials.password,
					user.senha
				);
				if (!isValidPassword) return null;

				return {
					id: user.id,
					name: user.email,
					email: user.email,
					role: user.role,
				};
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

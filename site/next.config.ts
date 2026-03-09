import type { NextConfig } from "next";

function getSupabaseHostname() {
	try {
		const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
		return url ? new URL(url).hostname : null;
	} catch {
		return null;
	}
}

const supabaseHostname = getSupabaseHostname();

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: supabaseHostname
			? [
					{
						protocol: "https",
						hostname: supabaseHostname,
					},
				]
			: [],
	},
};

export default nextConfig;

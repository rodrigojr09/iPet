import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				hostname: "cdn2.thecatapi.com",
			},
		],
	},
};

export default nextConfig;

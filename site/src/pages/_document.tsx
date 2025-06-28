import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
		<Html lang="en">
			<Head />
			<body className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
				<Main />
				<NextScript />
			</body>
		</Html>
  );
}

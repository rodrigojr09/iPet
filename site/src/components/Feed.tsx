import { useEffect, useState } from "react";
import Post from "./Post";
import moment from "moment-timezone";
import { PostModel } from "@/types/models";

export default function Feed() {
	const [posts, setPosts] = useState<PostModel[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/post?author=true")
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data)) {
					setPosts(data);
					setError(null);
				} else {
					setPosts([]);
					setError(data?.error || "Nao foi possivel carregar o feed.");
				}
			})
			.catch(() => {
				setPosts([]);
				setError("Nao foi possivel carregar o feed.");
			});
	}, []);

	if (error) {
		return (
			<div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
				{error}
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			{[...posts]
				.sort(
					(a, b) =>
						moment(b.createdAt).valueOf() -
						moment(a.createdAt).valueOf()
				)
				.map((post) => (
					<Post key={post.id} post={post} />
				))}
		</div>
	);
}

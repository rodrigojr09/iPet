import { useEffect, useState } from "react";
import Post from "./Post";
import { Prisma } from "@prisma/client";

export default function Feed() {
	const [posts, setPosts] = useState<
		Prisma.PostGetPayload<{ include: { author: true } }>[]
	>([]);

	useEffect(() => {
		fetch("/api/post?author=true", { method: "GET" })
			.then((res) => res.json())
			.then((data) => setPosts(data));
	}, []);

	return (
		<>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</>
	);
}

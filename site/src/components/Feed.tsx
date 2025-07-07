import { useEffect, useState } from "react";
import Post from "./Post";
import { Prisma } from "@prisma/client";
import moment from "moment-timezone";

export default function Feed() {
	const [posts, setPosts] = useState<
		Prisma.PostGetPayload<{ include: { author: true; comments: true } }>[]
	>([]);

	useEffect(() => {
		fetch("/api/post?author=true")
			.then((res) => res.json())
			.then((data) => setPosts(data));
	}, []);

	return (
		<div className="flex flex-col gap-6">
			{posts
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
export type Notification = {
	id: string;
	type: "like" | "comment" | "follow";
	data?: Record<string, unknown> | null;
	message: string;
	visto: boolean;
	createdAt: string | Date;
};

export type ProfileModel = {
	id: string;
	tag: string;
	nome: string;
	nascimento: string;
	foto: string;
	bio: string;
	raca: string;
	followers: string[];
	following: string[];
	notifications: Notification[];
	account_id: string;
};

export type AccountModel = {
	id: string;
	email: string;
	role: "admin" | "user";
	createdAt: string | Date;
	profiles: ProfileModel[];
};

export type CommentModel = {
	id: string;
	postId: string;
	authorId: string;
	text: string;
	createdAt: string | Date;
};

export type PostModel = {
	id: string;
	titulo: string | null;
	legenda: string | null;
	imageUrl: string | null;
	createdAt: string | Date;
	authorId: string;
	likes: string[];
	comments: CommentModel[];
	author: ProfileModel;
};

export type ProfileWithPosts = ProfileModel & {
	posts: PostModel[];
};

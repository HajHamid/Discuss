import PostCreateForm from "@/components/posts/post-create-form";
import { Divider } from "@nextui-org/react";
// import TopicList from "@/components/topics/topic-list";
import { db } from "@/db";
import { notFound } from "next/navigation";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";

export default async function TopicShowPage({ params }: { params: { slug: string } }) {

	const topic = await db.topic.findFirst({
		where: {
			slug: params.slug
		}
	})

	if (!topic) {
		return notFound()
	}

	return (
		<div className="grid grid-cols-4 gap-3">
			<div className="col-span-3">
				<h1 className="font-bold mb-3 capitalize text-lg">{topic.slug}</h1>
				<PostList fetchPosts={() => fetchPostsByTopicSlug(params.slug)} />
			</div>
			<div>
				<PostCreateForm slug={topic.slug} />
				<Divider className="my-2" />
				<h1 className="text-xl mb-2 capitalize font-semibold">{topic.slug}</h1>
				<p>{topic.description}</p>
			</div>
		</div>
	);
}

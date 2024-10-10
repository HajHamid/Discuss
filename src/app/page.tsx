import TopicCreateForm from "@/components/topics/create-topic-form";
import { Divider } from "@nextui-org/react";
import TopicList from "@/components/topics/topic-list";
import PostList from "@/components/posts/post-list";
import { fetchPosts } from "@/db/queries/posts";

export default function Home() {
	return (
		<div className="grid grid-cols-4 gap-3">
			<div className="col-span-3">
				<h1 className="font-semibold text-lg mb-3">Top Posts</h1>

				<PostList fetchPosts={() => fetchPosts()} />
			</div>
			<div>
				<TopicCreateForm />
				<Divider className="my-2" />
				<h1 className="text-xl mb-2">Topics</h1>
				<TopicList />
			</div>
		</div>
	);
}

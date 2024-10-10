import { FetchedPostData } from "@/db/queries/posts"
import PostItem from "./post-item"

export default async function PostList({ fetchPosts }: { fetchPosts: () => Promise<FetchedPostData[]> }) {
    const posts = await fetchPosts()
    const renderedPosts = posts.map((post) => {
        return <PostItem key={post.id} post={post} />
    })
    return <div className="space-y-3">{renderedPosts}</div>
}
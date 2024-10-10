import PostShow from "@/components/posts/post-show"
import CommentCreateForm from "@/components/comments/comment-create-form"
import CommentsList from "@/components/comments/comments-list";
import Link from "next/link";
import paths from "@/paths";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import { Suspense } from "react";
import PostSkeleton from "@/components/posts/post-skeleton";

interface PostDetailPageProps {
    postId: string;
    slug: string;
}

export default function PostDetailPage({ params }: { params: PostDetailPageProps }) {
    const { postId, slug } = params
    return (
        <div className="space-y-4">
            <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
                {'< '}Back to {slug}
            </Link>
            <Suspense fallback={<PostSkeleton />}>
                <PostShow postId={postId} />
            </Suspense>
            <CommentCreateForm postId={postId} startOpen />
            <CommentsList fetchData={() => fetchCommentsByPostId(postId)} />
        </div>
    )
}
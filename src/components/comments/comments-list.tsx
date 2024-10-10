import CommentShow from "./comment-show"
import { FetechedCommentsData } from "@/db/queries/comments"

interface CommentListProps {
    fetchData: () => Promise<FetechedCommentsData[]>
}

export default async function CommentsList({ fetchData }: CommentListProps) {
    const comments = await fetchData();

    const topLevelComments = comments.filter((comment) => !comment.parentId)

    const renderedComments = topLevelComments.map((comment) => {
        return <CommentShow key={comment.id} commentId={comment.id} comments={comments} />
    })

    return (
        <div>
            <h2 className="font-semibold text-lg">All <b>{comments.length}</b> Comments</h2>
            {renderedComments}
        </div>
    )
}
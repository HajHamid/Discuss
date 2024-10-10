import { db } from "@/db"
import { notFound } from "next/navigation"


export default async function PostShow({ postId }: { postId: string }) {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    const post = await db.post.findFirst({
        where: {
            id: postId
        }
    })

    if (!post) {
        return notFound()
    }

    return (
        <div className="space-y-3">
            <h1 className="text-lg font-semibold">{post.title}</h1>
            <div className="border p-3 rounded">{post.content}</div>
        </div>
    )
}
import { cache } from "react";
import { db } from "..";
import type { Comment } from "@prisma/client";

export type FetechedCommentsData = Comment & {
    user: { name: string | null; image: string | null };
};

export const fetchCommentsByPostId = cache((postId: string): Promise<FetechedCommentsData[]> => {
    console.log('Making a query');

    return db.comment.findMany({
        where: { postId },
        include: {
            user: { select: { name: true, image: true } },
        },
    });
})
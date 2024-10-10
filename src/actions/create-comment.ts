"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { string, z } from "zod";

interface CommentCreateForm {
    error: {
        content?: string[];
        _form?: string[];
    };
    success?: boolean;
}

const commentCreateSchema = z.object({
    content: string().min(5),
});

export async function createComment(
    { postId, parentId }: { postId: string; parentId?: string },
    formState: CommentCreateForm,
    formData: FormData,
): Promise<CommentCreateForm> {
    const session = await auth();

    const result = commentCreateSchema.safeParse({
        content: formData.get("content"),
    });

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
    }

    if (!session || !session.user || !session.user.id) {
        return { error: { _form: ["You should sign in to do this action"] } };
    }

    try {
        await db.comment.create({
            data: {
                content: result.data.content,
                userId: session.user.id,
                postId: postId,
                parentId: parentId,
            },
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {
                error: { _form: [e.message] },
            };
        }
        return { error: { _form: ["Failed to create comment"] } };
    }

    const topic = await db.topic.findFirst({
        where: { posts: { some: { id: postId } } },
    });

    if (!topic) {
        return {
            error: { _form: ["Failed to revalidate topic show"] },
        };
    }
    revalidatePath(paths.postShow(topic.slug, postId));
    return {
        error: {},
        success: true,
    };
    // revalidate post show
}

"use server";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { string, z } from "zod";

interface CreatePostFormState {
    error: {
        title?: string[];
        content?: string[];
        _form?: string[];
    };
}

const createPostSchema = z.object({
    title: string().min(3),
    content: string().min(10),
});

export async function createPost(
    slug: string,
    formState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState> {
    const session = await auth();

    const result = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    });

    if (!result.success) {
        return {
            error: result.error.flatten().fieldErrors,
        };
    }

    if (!session || !session.user || !session.user.id) {
        return {
            error: { _form: ["You should sign in to do this action"] },
        };
    }

    const topic = await db.topic.findFirst({
        where: { slug },
    });

    if (!topic) {
        return { error: { _form: ["topic not found"] } };
    }

    let post: Post;
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id,
            },
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            return { error: { _form: [e.message] } };
        }
        return {
            error: { _form: ["Something went wrong... please try later"] },
        };
    }
    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug, post.id));
}

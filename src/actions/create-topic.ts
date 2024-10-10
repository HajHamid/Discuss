"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

interface CreateTopicFormState {
    error: {
        name?: string[];
        description?: string[];
        _form?: string[];
    };
}

const createTopicSchema = z.object({
    name: z
        .string()
        .min(3)
        .regex(/^[a-z-]+$/),
    description: z.string().min(10),
});

export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
): Promise<CreateTopicFormState> {
    const session = await auth();

    const result = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
    });

    if (!result.success) {
        return {
            error: result.error.flatten().fieldErrors
        };
    }

    if (!session || !session.user) {
        return {
            error: { _form: ["You must sign in to do this action"] },
        };
    }

    let topic;
    try{
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
            }
        })
    } catch (e: unknown)  {
        if (e instanceof Error) {
            return {
                error: {_form: [e.message]}
            }
        }
        return {
            error: {_form: ['Something went wrong... please try later']}
        }
    }

    revalidatePath('/')
    redirect(paths.topicShow(topic.slug))

    // revaildate home
}

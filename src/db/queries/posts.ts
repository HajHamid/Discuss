import { db } from "..";
import type { Post } from "@prisma/client";

export type FetchedPostData = Post & {
    topic: { slug: string };
    user: { name: string | null };
    _count: { comments: number };
};

export function fetchPostsByTopicSlug(
    slug: string
): Promise<FetchedPostData[]> {
    return db.post.findMany({
        where: { topic: { slug: slug } },
        include: {
            user: { select: { name: true } },
            topic: { select: { slug: true } },
            _count: { select: { comments: true } },
        },
    });
}

export function fetchPosts(): Promise<FetchedPostData[]> {
    return db.post.findMany({
        orderBy: [{ comments: { _count: "desc" } }],
        include: {
            user: { select: { name: true } },
            topic: { select: { slug: true } },
            _count: { select: { comments: true } },
        },
        take: 5,
    });
}

export function fetchPostsBySearchTerms(
    term: string
): Promise<FetchedPostData[]> {
    return db.post.findMany({
        include: {
            user: { select: { name: true } },
            topic: { select: { slug: true } },
            _count: { select: { comments: true } },
        },
        where: {
            OR: [
                { title: { contains: term } },
                { content: { contains: term } },
            ],
        },
    });
}

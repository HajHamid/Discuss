import { redirect } from "next/navigation"
import PostList from "@/components/posts/post-list"
import { fetchPostsBySearchTerms } from "@/db/queries/posts"

interface SearchParamsProps {
    searchParams: { terms: string }
}

export default function SearchPage({ searchParams }: SearchParamsProps) {
    const { terms } = searchParams

    if (!terms) {
        redirect('/')
    }


    return (
        <div>
            <h1 className="text-lg font-bold">{terms}</h1>
            <PostList fetchPosts={() => fetchPostsBySearchTerms(terms)} />
        </div>
    )
}
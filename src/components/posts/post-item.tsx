import Link from 'next/link'
import paths from '@/paths'
import { FetchedPostData } from '@/db/queries/posts'

export default function PostItem({ post }: { post: FetchedPostData }) {
    return <div className='border p-2 rounded'>
        <Link href={paths.postShow(post.topic.slug, post.id)}>
            <div className='flex flex-col gap-2'>
                <h3 className='post'>{post.title}</h3>
                <div className='flex items-center justify-between'>
                    <span className='text-xs'>By<b> {post.user.name}</b></span>
                    <span className='text-xs'><b>{post._count.comments}</b> Comments</span>
                </div>
            </div>
        </Link>
    </div>
}
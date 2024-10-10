'use client'

import * as actions from '@/actions'
import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function SearchInput() {
    const searchParams = useSearchParams()

    return (
        <form action={actions.search}>
            <Input type="text" name='search' placeholder="search" defaultValue={searchParams.get('terms') || ''} />
        </form>
    )
}

'use client'

import { signIn, signOut } from "@/actions";
import { NavbarItem } from "@nextui-org/navbar";
import {
    Button,
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@nextui-org/react";
import { useSession } from "next-auth/react";


export default function HeaderAuth() {
    const session = useSession()

    let content;
    if (session.status === 'loading') {
        content = null
    }
    else if (session.data?.user) {
        content = (
            <Popover placement="bottom">
                <PopoverTrigger>
                    <Avatar src={session.data.user.image || ''} />
                </PopoverTrigger>
                <PopoverContent>
                    <div className="px-1 py-2">
                        <form action={signOut}>
                            <Button type="submit" color="primary" href="#" variant="flat">
                                Sign Out
                            </Button>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>
        )
    } else {
        content = (
            <>
                <NavbarItem className="hidden lg:flex">
                    <form action={signIn}>
                        <Button type="submit" variant="bordered" color="secondary">Sign Up</Button>
                    </form>
                </NavbarItem>
                <NavbarItem>
                    <form action={signIn}>
                        <Button type="submit" color="primary" href="#" variant="flat">
                            Sign In
                        </Button>
                    </form>
                </NavbarItem>
            </>
        )
    }

    return content
}
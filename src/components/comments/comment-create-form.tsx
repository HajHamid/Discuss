"use client";

import { Textarea } from "@nextui-org/react";
import FormButton from "../common/button-form";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";

interface CommentCreateFormProps {
    postId: string;
    parentId?: string;
    startOpen?: boolean;
}

export default function CommentCreateForm({
    postId,
    parentId,
    startOpen
}: CommentCreateFormProps) {
    const ref = useRef<HTMLFormElement | null>(null)
    const [open, setOpen] = useState(startOpen)
    
    const [formState, action] = useFormState(
        actions.createComment.bind(null, { postId, parentId }),
        { error: {}, success: false }
    );

    useEffect(() => {
        if (formState.success) {
            ref.current?.reset()

            if (!startOpen) {
                setOpen(false)
            }

        }

    }, [formState, startOpen])

    const form = (
        <form action={action} ref={ref}>
            <div className="space-y-2 px-1">
                <Textarea
                    name="content"
                    placeholder="Comment... "
                    isInvalid={!!formState.error.content}
                    errorMessage={formState.error.content?.join(", ")}
                />

                {formState.error._form && (
                    <div className="p-2 bg-red-200 text-red-600 border-red-600">
                        {formState.error._form.join(", ")}
                    </div>
                )}
                <FormButton>Send</FormButton>
            </div>
        </form>
    )

    return (


        <div>
            <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
                Reply
            </Button>
            {open && form}
        </div>
    );


}

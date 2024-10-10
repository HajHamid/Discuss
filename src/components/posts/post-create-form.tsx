'use client'

import { Button, Popover, PopoverContent, PopoverTrigger, Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from '@/actions'
import FormButton from "../common/button-form";

export default function PostCreateForm({ slug }: { slug: string }) {
    const [formState, action] = useFormState(actions.createPost.bind(null, slug), { error: {} })
    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button>Create post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="p-4 flex flex-col gap-2 w-80">
                        <h2>Create a topic</h2>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-xs">Title</label>
                            <Input
                                type="text"
                                name="title"
                                isInvalid={!!formState.error.title}
                                errorMessage={formState.error.title?.join(', ')}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="content" className="text-xs">Content</label>
                            <Textarea
                                name="content"
                                isInvalid={!!formState.error.content}
                                errorMessage={formState.error.content?.join(', ')}
                            />
                        </div>

                        {formState.error._form && <div className="p-2 bg-red-200 text-red-600 border-red-600 rounded font-semibold">{formState.error._form.join(', ')}</div>}
                        <FormButton>Create</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}
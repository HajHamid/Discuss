'use client'

import { useFormState } from "react-dom";
import * as actions from "@/actions"
import {
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Input,
    Textarea
} from "@nextui-org/react";
import FormButton from "../common/button-form";


export default function TopicCreateForm() {
    const [formState, action] = useFormState(actions.createTopic, { error: {} })

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">Create topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="p-4 flex flex-col gap-2 w-80">
                        <h2>Create a topic</h2>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-xs">Name</label>
                            <Input
                                type="text"
                                name="name"
                                isInvalid={!!formState.error.name}
                                errorMessage={formState.error.name?.join(', ')}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-xs">Description</label>
                            <Textarea
                                name="description"
                                isInvalid={!!formState.error.description}
                                errorMessage={formState.error.description?.join(', ')}
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
'use client'

import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";

export function Form() {
    const { execute, FieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            console.log(data, "SUCCESS!")
        },
        onError: (error) => {
            console.error(error)
        }
    })

    function onSubmit(formData: FormData) {
        const title = formData.get("title") as string

        execute({ title })
    }

    return (
        <form action={onSubmit}>
            <input
                id="title"
                name="title"
                type="text"
                placeholder="Insira um título"
                required
                className="p-1 border border-input"
            />

            <Button type="submit">
                Submit
            </Button>
        </form>
    )
}

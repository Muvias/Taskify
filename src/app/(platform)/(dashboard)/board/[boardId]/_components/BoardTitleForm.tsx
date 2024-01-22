'use client'

import { updateBoard } from "@/actions/update-board"
import { FormInput } from "@/components/form/formInput"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"
import { Board } from "@prisma/client"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"

interface BoardTitleFormProps {
    board: Board
}

export function BoardTitleForm({ board }: BoardTitleFormProps) {
    const { execute } = useAction(updateBoard, {
        onSuccess: (data) => {
            toast.success(`Quadro "${data.title}" atualizado!`)

            setTitle(data.title)
            disableEditing()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const [title, setTitle] = useState(board.title)
    const [isEditing, setIsEditing] = useState(false)

    function enableEditing() {
        setIsEditing(true)

        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        })
    }

    function disableEditing() {
        setIsEditing(false)
    }

    function onSubmit(formData: FormData) {
        const title = formData.get("title") as string

        execute({
            title,
            id: board.id
        })
    }

    function onBlur() {
        formRef.current?.requestSubmit()
    }

    if (isEditing) {
        return (
            <form
                ref={formRef}
                action={onSubmit}
                className="flex items-center gap-x-2"
            >
                <FormInput
                    id="title"
                    ref={inputRef}
                    onBlur={onBlur}
                    defaultValue={title}
                    className="h-7 py-1 px-[7px] text-lg font-bold bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                />
            </form>
        )
    }

    return (
        <Button
            variant="transparent"
            className="h-auto w-auto py-1 px-2 font-bold text-lg"
            onClick={enableEditing}
        >
            {title}
        </Button>
    )
}

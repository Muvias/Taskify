'use client'

import { updateList } from "@/actions/update-list"
import { FormInput } from "@/components/form/formInput"
import { useAction } from "@/hooks/use-action"
import { List } from "@prisma/client"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"
import { useEventListener } from "usehooks-ts"
import { ListOptions } from "./ListOptions"

interface ListHeaderProps {
    list: List
    onAddCard: () => void
}

export function ListHeader({ list, onAddCard }: ListHeaderProps) {
    const [title, setTitle] = useState(list.title)
    const [isEditing, setIsEditing] = useState(false)

    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const { execute } = useAction(updateList, {
        onSuccess: (data) => {
            toast.success(`Renomeado para "${data.title}"`)

            setTitle(data.title)
            disableEditing()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

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

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            formRef.current?.requestSubmit()
        }
    }

    useEventListener("keydown", onKeyDown)

    function handleSubmit(formData: FormData) {
        const id = formData.get("id") as string
        const title = formData.get("title") as string
        const boardId = formData.get("boardId") as string

        if (title === list.title) {
            return disableEditing();
        }

        execute({
            id,
            title,
            boardId
        })
    }

    function onBlur() {
        formRef.current?.requestSubmit()
    }


    return (
        <div className="flex justify-between items-start pt-2 px-2 gap-x-2 text-sm font-semibold">
            {isEditing ? (
                <form
                    ref={formRef}
                    action={handleSubmit}
                    className="flex-1 px-0.5"
                >
                    <input hidden id="id" name="id" value={list.id} readOnly />
                    <input hidden id="boardId" name="boardId" value={list.boardId} readOnly />

                    <FormInput
                        ref={inputRef}
                        onBlur={onBlur}
                        id="title"
                        placeholder="Nome da lista..."
                        defaultValue={title}
                        className="text-sm h-7 px-[7px] py-1 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
                    />

                    <button type="submit" hidden />
                </form>
            ) : (
                <div
                    onClick={enableEditing}
                    className="w-full h-7 px-2.5 py-1 text-sm font-medium border-transparent"
                >
                    {title}
                </div>
            )}

            <ListOptions
                list={list}
                onAddCard={onAddCard}
            />
        </div>
    )
}

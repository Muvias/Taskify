'use client'

import { createList } from "@/actions/create-list"
import { FormInput } from "@/components/form/formInput"
import { FormSubmit } from "@/components/form/formSubmit"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"
import { PlusIcon, XIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { ListWrapper } from "./ListWrapper"

export function ListForm() {
    const params = useParams()
    const router = useRouter()

    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const [isEditing, setIsEditing] = useState(false)

    const { execute, fieldErrors } = useAction(createList, {
        onSuccess: (data) => {
            toast.success(`Lista "${data.title}" criada`)

            disableEditing()
            router.refresh()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    function enableEditing() {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
        })
    }

    function disableEditing() {
        setIsEditing(false)
    }

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            disableEditing()
        }
    }

    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    function onSubmit(formData: FormData) {
        const title = formData.get("title") as string
        const boardId = formData.get("boardId") as string

        execute({
            title,
            boardId
        })
    }

    if (isEditing) {
        return (
            <ListWrapper>
                <form
                    action={onSubmit}
                    ref={formRef}
                    className="w-full p-3 space-y-4 rounded-md shadow-md bg-white"
                >
                    <FormInput
                        ref={inputRef}
                        id="title"
                        placeholder="Título da lista..."
                        errors={fieldErrors}
                        className="h-7 px-2 py-1 text-sm font-medium border-transparent hover:border-input focus:border-input transition"
                    />
                    <input
                        hidden
                        value={params.boardId}
                        readOnly
                        name="boardId"
                    />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>
                            Adc lista
                        </FormSubmit>

                        <Button
                            onClick={disableEditing}
                            size="sm"
                            variant="ghost"
                        >
                            <XIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
            <button
                onClick={enableEditing}
                className="flex items-center w-full p-3 font-medium text-sm rounded-md bg-white/80 hover:bg-white/60 transition"
            >
                <PlusIcon className="h-4 w-4 mr-2" />
                Adc uma lista
            </button>
        </ListWrapper>
    )
}

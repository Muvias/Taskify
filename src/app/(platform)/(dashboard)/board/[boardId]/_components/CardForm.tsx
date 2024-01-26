'use client'

import { createCard } from "@/actions/create-card"
import { FormSubmit } from "@/components/form/formSubmit"
import { FormTextarea } from "@/components/form/formTextarea"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"
import { PlusIcon, XIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

interface CardFormProps {
    listId: string
    isEditing: boolean
    enableEditing: () => void
    disableEditing: () => void
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<"form">>(null)

    const { execute, fieldErrors } = useAction(createCard, {
        onSuccess: (data) => {
            toast.success(`Cartão "${data.title}" criado!`)

            formRef.current?.reset()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            disableEditing()
        }
    }

    useOnClickOutside(formRef, disableEditing)
    useEventListener("keydown", onKeyDown)

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()

            formRef.current?.requestSubmit()
        }
    }

    function onSubmit(formData: FormData) {
        const title = formData.get("title") as string
        const boardId = params.boardId as string
        const listId = formData.get("listId") as string

        execute({
            title,
            boardId,
            listId
        })
    }

    if (isEditing) {
        return (
            <form
                ref={formRef}
                action={onSubmit}
                className="py-0.5 px-1 m-1 space-y-4"
            >
                <FormTextarea
                    id="title"
                    onKeyDown={onTextareaKeyDown}
                    ref={ref}
                    placeholder="Insira um título para este cartão..."
                    errors={fieldErrors}
                />

                <input
                    hidden
                    readOnly
                    id="listId"
                    name="listId"
                    value={listId}
                />

                <div className="flex items-center gap-x-1">
                    <FormSubmit>
                        Adc cartão
                    </FormSubmit>

                    <Button onClick={disableEditing} size="sm" variant="ghost">
                        <XIcon className="h-5 w-5" />
                    </Button>
                </div>
            </form>
        )
    }

    return (
        <div className="pt-2 px-2">
            <Button
                onClick={enableEditing}
                className="justify-start h-auto w-full px-2 py-1.5 text-sm text-muted-foreground"
                size="sm"
                variant="ghost"
            >
                <PlusIcon className="h-4 w-4 mr-2" />
                Adc um cartão
            </Button>
        </div>
    )
})

CardForm.displayName = "CardForm"

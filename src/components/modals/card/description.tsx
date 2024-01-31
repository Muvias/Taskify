"use client"

import { updateCard } from "@/actions/update-card"
import { FormSubmit } from "@/components/form/formSubmit"
import { FormTextarea } from "@/components/form/formTextarea"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAction } from "@/hooks/use-action"
import { CardWithList } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { AlignLeftIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

interface DescriptionProps {
    card: CardWithList
}

export function Description({ card }: DescriptionProps) {
    const queryClient = useQueryClient()
    const params = useParams()

    const textareaRef = useRef<ElementRef<"textarea">>(null)
    const formRef = useRef<ElementRef<"form">>(null)

    const [isEditing, setIsEditing] = useState(false)

    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['card', data.id]
            })

            toast.success(`Descrição de "${data.title}" atualizada`)

            disableEditing()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    function enableEditing() {
        setIsEditing(true)

        setTimeout(() => {
            textareaRef.current?.focus()
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
        const description = formData.get("description") as string
        const boardId = params.boardId as string

        execute({
            id: card.id,
            description,
            boardId,
        })
    }

    return (
        <div className="flex items-start w-full gap-x-3">
            <AlignLeftIcon className="h-5 w-5 mt-0.5 text-neutral-700" />

            <div className="w-full">
                <p className="mb-2 font-semibold text-neutral-700">
                    Descrição
                </p>

                {isEditing ? (
                    <form
                        ref={formRef}
                        action={onSubmit}
                        className="space-y-2"
                    >
                        <FormTextarea
                            id="description"
                            ref={textareaRef}
                            defaultValue={card.description || undefined}
                            placeholder="Adicione uma descrição mais detalhada..."
                            className="w-full mt-2"
                            errors={fieldErrors}
                        />
                        <div className="flex items-center gap-x-2">
                            <FormSubmit>
                                Salvar
                            </FormSubmit>

                            <Button
                                type="button"
                                size='sm'
                                variant='ghost'
                                onClick={disableEditing}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div
                        role="button"
                        onClick={enableEditing}
                        className="min-h-[78px] px-3.5 py-3 text-sm font-medium rounded-md bg-neutral-200"
                    >
                        {card.description || "Adicione uma descrição mais detalhada..."}
                    </div>
                )}
            </div>
        </div>
    )
}

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex items-start w-full gap-x-3">
            <Skeleton className="h-6 w-6 bg-neutral-200" />

            <div className="w-full">
                <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
                <Skeleton className="h-[78px] w-full bg-neutral-200" />
            </div>
        </div>
    )
}
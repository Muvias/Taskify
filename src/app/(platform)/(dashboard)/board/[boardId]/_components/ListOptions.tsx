'use client'

import { deleteList } from "@/actions/delete-list"
import { FormSubmit } from "@/components/form/formSubmit"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useAction } from "@/hooks/use-action"
import { List } from "@prisma/client"
import { MoreHorizontalIcon, XIcon } from "lucide-react"
import { ElementRef, useRef } from "react"
import { toast } from "sonner"

interface ListOptionsProps {
    list: List
    onAddCard: () => void
}

export function ListOptions({ list, onAddCard }: ListOptionsProps) {
    const closeRef = useRef<ElementRef<"button">>(null)

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: (data) => {
            toast.success(`Lista "${data.title}" deletada!`)

            closeRef.current?.click()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    function onDelete(formData: FormData) {
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string

        executeDelete({
            id,
            boardId
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className="h-auto w-auto p-2 hover:bg-white/80 transition"
                    variant="ghost"
                >
                    <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="py-3 px-0" side="bottom" align="start">
                <div className="pb-4 text-sm font-medium text-center text-neutral-600">
                    Ações da lista
                </div>

                <PopoverClose ref={closeRef} asChild>
                    <Button
                        variant="ghost"
                        className="absolute top-2 right-2 h-auto w-auto p-2 text-neutral-600"
                    >
                        <XIcon className="h-4 w-4" />
                    </Button>
                </PopoverClose>

                <Button
                    onClick={onAddCard}
                    variant="ghost"
                    className="justify-start w-full h-auto p-2 px-5 rounded-none text-sm font-normal"
                >
                    Adc carrinho...
                </Button>

                <form>
                    <input hidden name="id" id="id" value={list.id} readOnly />
                    <input hidden name="boardId" id="boardId" value={list.boardId} readOnly />

                    <FormSubmit
                        variant="ghost"
                        className="justify-start w-full h-auto p-2 px-5 rounded-none text-sm font-normal"
                    >
                        Copiar lista...
                    </FormSubmit>
                </form>

                <Separator />

                <form action={onDelete}>
                    <input hidden name="id" id="id" value={list.id} readOnly />
                    <input hidden name="boardId" id="boardId" value={list.boardId} readOnly />

                    <FormSubmit
                        variant="ghost"
                        className="justify-start w-full h-auto p-2 px-5 rounded-none text-sm font-normal"
                    >
                        Deletar esta lista
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}

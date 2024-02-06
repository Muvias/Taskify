'use client'

import { createBoard } from "@/actions/create-board"
import { useAction } from "@/hooks/use-action"
import { useProModal } from "@/hooks/useProModal"
import { useRouter } from "next/navigation"
import { ElementRef, useRef } from "react"

import { XIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "../ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover"

import { FormInput } from "./formInput"
import { FormPicker } from "./formPicker"
import { FormSubmit } from "./formSubmit"

interface FormPopoverProps {
    children: React.ReactNode
    side?: "left" | "right" | "top" | "bottom"
    align?: "start" | "center" | "end"
    sideOffset?: number
}

export function FormPopover({ children, side = "bottom", align, sideOffset = 0 }: FormPopoverProps) {
    const router = useRouter()
    const closeRef = useRef<ElementRef<"button">>(null)

    const proModal = useProModal()

    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            toast.success("Quadro criado!")

            closeRef.current?.click()
            
            router.push(`/board/${data.id}`)
        },
        onError: (error) => {
            toast.error(error)

            proModal.onOpen()
        }
    })

    function onSubmit(formData: FormData) {
        const title = formData.get("title") as string
        const image = formData.get("image") as string

        execute({ title, image })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>

            <PopoverContent
                align={align}
                side={side}
                sideOffset={sideOffset}
                className="w-80 pt-3"
            >
                <div className="pb-4 text-sm font-medium text-center text-neutral-600">
                    Criar Quadro
                </div>
                <PopoverClose asChild ref={closeRef}>
                    <Button
                        className="absolute h-auto w-auto top-2 right-2 p-2 text-neutral-600"
                        variant="ghost"
                    >
                        <XIcon className="w-4 h-4" />
                    </Button>
                </PopoverClose>

                <form
                    action={onSubmit}
                    className="space-y-4"
                >
                    <div className="space-y-4">
                        <FormPicker
                            id="image"
                            errors={fieldErrors}
                        />
                        <FormInput
                            id="title"
                            label="Titulo do Quadro"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>

                    <FormSubmit className="w-full">
                        Criar
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}

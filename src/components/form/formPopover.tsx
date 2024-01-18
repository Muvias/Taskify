'use client'

import { createBoard } from "@/actions/create-board"
import { useAction } from "@/hooks/use-action"

import { XIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "../ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover"

import { FormInput } from "./formInput"
import { FormSubmit } from "./formSubmit"

interface FormPopoverProps {
    children: React.ReactNode
    side?: "left" | "right" | "top" | "bottom"
    align?: "start" | "center" | "end"
    sideOffset?: number
}

export function FormPopover({ children, side = "bottom", align, sideOffset = 0 }: FormPopoverProps) {
    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            toast.success("Quadro criado!")
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    function onSubmit(formData: FormData) {
        const title = formData.get("title") as string

        execute({ title })
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
                <PopoverClose asChild>
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

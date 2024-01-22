'use client'

import { deleteBoard } from "@/actions/delete-board"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverClose, PopoverContent } from "@/components/ui/popover"
import { useAction } from "@/hooks/use-action"
import { MoreHorizontalIcon, XIcon } from "lucide-react"
import { toast } from "sonner"

interface BoardOptionsProps {
    id: string
}

export function BoardOptions({ id }: BoardOptionsProps) {
    const { execute, isLoading } = useAction(deleteBoard, {
        onError: (error) => {
            toast.error(error)
        }
    })

    function onDelete() {
        execute({ id })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="transparent">
                    <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="px-0 py-3" side="bottom" align="start">
                <div className="pb-4 text-sm font-medium text-center text-neutral-600">
                    Ações do quadro
                </div>

                <PopoverClose asChild>
                    <Button
                        variant="ghost"
                        className="absolute top-2 right-2 h-auto w-auto p-2 text-neutral-600"
                    >
                        <XIcon className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <Button
                    variant="ghost"
                    className="justify-start w-full h-auto py-2 px-5 rounded-none font-normal text-sm"
                    onClick={onDelete}
                    disabled={isLoading}
                >
                    Deletar este quadro
                </Button>
            </PopoverContent>
        </Popover>
    )
}

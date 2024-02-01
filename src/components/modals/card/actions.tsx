'use client'

import { copyCard } from "@/actions/copy-card"
import { deleteCard } from "@/actions/delete-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAction } from "@/hooks/use-action"
import { useCardModal } from "@/hooks/useCardModal"
import { CardWithList } from "@/types"
import { CopyIcon, TrashIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { toast } from "sonner"

interface ActionsProps {
    card: CardWithList
}

export function Actions({ card }: ActionsProps) {
    const params = useParams()
    const cardModal = useCardModal()

    const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(copyCard, {
        onSuccess: () => {
            toast.success(`Cartão "${card.title}" duplicado!`)

            cardModal.onClose()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(deleteCard, {
        onSuccess: (data) => {
            toast.success(`Cartão "${data.title}" deletado!`)

            cardModal.onClose()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    function onCopy() {
        const boardId = params.boardId as string

        executeCopyCard({
            id: card.id,
            boardId
        })
    }

    function onDelete() {
        const boardId = params.boardId as string

        executeDeleteCard({
            id: card.id,
            boardId
        })
    }

    return (
        <div className="mt-2 space-y-2">
            <p className="text-xs font-semibold">
                Ações
            </p>

            <Button
                size="inline"
                variant="ghost"
                onClick={onCopy}
                disabled={isLoadingCopy}
                className="w-full justify-start"
            >
                <CopyIcon className="w-4 h-4 mr-2 text-neutral-700" />
                Duplicar
            </Button>

            <Button
                size="inline"
                variant="ghost"
                onClick={onDelete}
                disabled={isLoadingDelete}
                className="w-full justify-start"
            >
                <TrashIcon className="w-4 h-4 mr-2 text-neutral-700" />
                Deletar
            </Button>
        </div>
    )
}

Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className="mt-2 space-y-2">
            <Skeleton className="w-20 h-4 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    )
}

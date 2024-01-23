'use client'

import { ListWithCards } from "@/types"
import { ListForm } from "./ListForm"

interface ListContainerProps {
    boardId: string
    lists: ListWithCards[]
}

export function ListContainer({ boardId, lists }: ListContainerProps) {
    return (
        <ol className="">
            <ListForm />
            <div className="flex w-1 shrink-0" />
        </ol>
    )
}

'use client'

import { ListWithCards } from "@/types"
import { ListForm } from "./ListForm"
import { useEffect, useState } from "react"
import { ListItem } from "./ListItem"

interface ListContainerProps {
    boardId: string
    lists: ListWithCards[]
}

export function ListContainer({ boardId, lists }: ListContainerProps) {
    const [orderedLists, setOrderedLists] = useState(lists)

    useEffect(() => {
        setOrderedLists(lists)
    }, [lists])

    return (
        <ol className="flex h-full gap-x-3">
            {orderedLists.map((list, index) => {
                return (
                    <ListItem
                        key={list.id}
                        index={index}
                        list={list}
                    />
                )
            })}
            <ListForm />
            <div className="flex w-1 shrink-0" />
        </ol>
    )
}

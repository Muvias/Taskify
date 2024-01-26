import { ListWithCards } from "@/types"
import { ElementRef, useRef, useState } from "react"
import { ListHeader } from "./ListHeader"
import { CardForm } from "./CardForm"

interface ListItemProps {
    index: number
    list: ListWithCards
}

export function ListItem({ index, list }: ListItemProps) {
    const textareaRef = useRef<ElementRef<"textarea">>(null)

    const [isEditing, setIsEditing] = useState(false)

    function enableEditing() {
        setIsEditing(true)

        setTimeout(() => {
            textareaRef.current?.focus()
        })
    }

    function disableEditing() {
        setIsEditing(false)
    }

    return (
        <li className="h-full w-[272px] shrink-0 select-none">
            <div className="w-full pb-2 rounded-md shadow-md bg-[#f1f2f4]">
                <ListHeader
                    onAddCard={enableEditing}
                    list={list}
                />

                <CardForm
                    listId={list.id}
                    ref={textareaRef}
                    isEditing={isEditing}
                    enableEditing={enableEditing}
                    disableEditing={disableEditing}
                />
            </div>
        </li>
    )
}

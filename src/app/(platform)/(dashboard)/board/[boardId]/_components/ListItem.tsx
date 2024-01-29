import { ListWithCards } from "@/types"
import { ElementRef, useRef, useState } from "react"
import { ListHeader } from "./ListHeader"
import { CardForm } from "./CardForm"
import { cn } from "@/lib/utils"
import { CardItem } from "./CardItem"
import { Draggable, Droppable } from "@hello-pangea/dnd"

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
        <Draggable draggableId={list.id} index={index}>
            {(provided) => (
                <li
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="h-full w-[272px] shrink-0 select-none"
                >
                    <div
                        {...provided.dragHandleProps}
                        className="w-full pb-2 rounded-md shadow-md bg-[#f1f2f4]"
                    >
                        <ListHeader
                            onAddCard={enableEditing}
                            list={list}
                        />

                        <Droppable droppableId={list.id} type="card">
                            {(provided) => (
                                <ol
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={cn("flex flex-col px-1 py-0.5 mx-1 gap-y-2",
                                        list.Cards.length > 0 ? "mt-2" : "mt-0"
                                    )}
                                >
                                    {list.Cards.map((card, index) => (
                                        <CardItem
                                            key={card.id}
                                            index={index}
                                            card={card}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>

                        <CardForm
                            listId={list.id}
                            ref={textareaRef}
                            isEditing={isEditing}
                            enableEditing={enableEditing}
                            disableEditing={disableEditing}
                        />
                    </div>
                </li>
            )}
        </Draggable>
    )
}

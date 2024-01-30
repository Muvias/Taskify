"use client"

import { Card } from "@prisma/client"
import { Draggable } from "@hello-pangea/dnd"
import { useCardModal } from "@/hooks/useCardModal"

interface CardItemProps {
    index: number
    card: Card
}

export function CardItem({ index, card }: CardItemProps) {
    const cardModal = useCardModal()

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    role="button"
                    onClick={() => cardModal.onOpen(card.id)}
                    className="px-3 py-2 text-sm truncate rounded-md shadow-sm border-2 border-transparent hover:border-black bg-white"
                >
                    {card.title}
                </div>
            )}
        </Draggable>
    )
}

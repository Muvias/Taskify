'use client'

import { ListWithCards } from "@/types"
import { ListForm } from "./ListForm"
import { useEffect, useState } from "react"
import { ListItem } from "./ListItem"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import { useAction } from "@/hooks/use-action"
import { updateListOrder } from "@/actions/update-list-order"
import { toast } from "sonner"
import { updateCardOrder } from "@/actions/update-card-order"

interface ListContainerProps {
    boardId: string
    lists: ListWithCards[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

export function ListContainer({ boardId, lists }: ListContainerProps) {
    const [orderedLists, setOrderedLists] = useState(lists)

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: () => {
            toast.success("Lista reorganizada")
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess: () => {
            toast.success("Cartões reorganizados")
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    useEffect(() => {
        setOrderedLists(lists)
    }, [lists])

    function onDragEnd(result: any) {
        const { destination, source, type } = result

        if (!destination) return;

        // Soltar o elemento na mesma posição:
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Ao mover uma lista, salvar a posição
        if (type === "list") {
            const items = reorder(
                orderedLists,
                source.index,
                destination.index
            ).map((item, index) => ({ ...item, order: index }))

            setOrderedLists(items)
            executeUpdateListOrder({ items, boardId })
        }

        // Ao mover um cartão, salvar a posição
        if (type === "card") {
            let newOrderedLists = [...orderedLists]

            const sourceList = newOrderedLists.find(list => list.id === source.droppableId)
            const destinationList = newOrderedLists.find(list => list.id === destination.droppableId)

            if (!sourceList || !destinationList) return;

            // Verificar se existe algum cartão na sourceList
            if (!sourceList.Cards) {
                sourceList.Cards = []
            }

            // Verificar se o cartão existe na destinationList
            if (!destinationList.Cards) {
                destinationList.Cards = []
            }

            // Mover o cartão na mesma lista
            if (source.droppableId === destination.droppableId) {
                const reorderedCards = reorder(
                    sourceList.Cards,
                    source.index,
                    destination.index
                )

                reorderedCards.forEach((card, index) => { card.order = index })

                sourceList.Cards = reorderedCards

                setOrderedLists(newOrderedLists)
                executeUpdateCardOrder({
                    boardId,
                    items: reorderedCards
                })
            } else {
                // Mover o cartão para outra lista

                // Remover o cartão da list original
                const [movedCard] = sourceList.Cards.splice(source.index, 1)

                // Alterar o listId do cartão
                movedCard.listId = destination.droppableId

                // Adicionar o cartão na nova lista
                destinationList.Cards.splice(destination.index, 0, movedCard)

                sourceList.Cards.forEach((card, index) => {
                    card.order = index
                })

                // Atualizar a posição de cada cartão da lista destinada
                destinationList.Cards.forEach((card, index) => {
                    card.order = index
                })

                setOrderedLists(newOrderedLists)
                executeUpdateCardOrder({
                    boardId,
                    items: destinationList.Cards
                })
            }
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided) => (
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex h-full gap-x-3"
                    >
                        {orderedLists.map((list, index) => {
                            return (
                                <ListItem
                                    key={list.id}
                                    index={index}
                                    list={list}
                                />
                            )
                        })}
                        {provided.placeholder}
                        <ListForm />
                        <div className="flex w-1 shrink-0" />
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    )
}

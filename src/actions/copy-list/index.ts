"use server"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { CopyList } from "./schema"
import { InputType, ReturnType } from "./types"
import { createAuditLog } from "@/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const { id, boardId } = data

    let list;

    try {
        const listToCopy = await db.list.findUnique({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                }
            },
            include: { Cards: true }
        })

        if (!listToCopy) {
            return { error: "Lista não encontrada" }
        }

        const lastList = await db.list.findFirst({
            where: { boardId },
            orderBy: { order: "desc" },
            select: { order: true }
        })

        const newOrder = lastList ? lastList.order + 1 : 1

        list = await db.list.create({
            data: {
                boardId: listToCopy.boardId,
                title: `${listToCopy.title} - Cópia`,
                order: newOrder,
                Cards: {
                    createMany: {
                        data: listToCopy.Cards.map((card) => ({
                            title: card.title,
                            description: card.description,
                            order: card.order
                        }))
                    }
                }
            },
            include: { Cards: true }
        })

        await createAuditLog({
            entityTitle: list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.CREATE
        })
    } catch (error) {
        return {
            error: "Falha ao copiar."
        }
    }

    revalidatePath(`/board/${boardId}`)

    return { data: list }
}

export const copyList = createSafeAction(CopyList, handler)
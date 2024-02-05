"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { InputType, ReturnType } from "./types"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateBoard } from "./schema"
import { createAuditLog } from "@/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { hasAvailableCount, incrementAvailableCount } from "@/lib/org-limit"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const canCreate = await hasAvailableCount()

    if (!canCreate) {
        return { error: "Você atingiu o limite de quadros grátis, por favor assine para criar mais."}
    }

    const { title, image } = data
    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
    ] = image.split("|")

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
        return {
            error: "Faltando alguns campos. Falha ao criar o Quadro."
        }
    }

    let board;

    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageLinkHTML,
                imageUserName
            }
        })

        await incrementAvailableCount()

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.CREATE
        })
    } catch (error) {
        return {
            error: "Falha ao criar."
        }
    }

    revalidatePath(`/board/${board.id}`)

    return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)
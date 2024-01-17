'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from 'zod'

export type State = {
    errors?: {
        title?: string[]
    },
    message?: string | null
}

const CreateBoard = z.object({
    title: z.string().min(3, {
        message: "Mínimo de 3 caracteres"
    })
})

export async function create(prevState: State, formData: FormData) {
    const validatedFields = CreateBoard.safeParse({
        title: formData.get("title")
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Faltando campo."
        }
    }

    const { title } = validatedFields.data

    try {
        await db.board.create({
            data: {
                title,
            }
        })
    } catch (error) {
        return {
            message: "Database Error"
        }
    }

    revalidatePath("/organization/org_2arg0KAViDkNoE3VuWVte9st2Hs")
    redirect("/organization/org_2arg0KAViDkNoE3VuWVte9st2Hs")
}    
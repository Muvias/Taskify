import { z } from 'zod'

export const CreateList = z.object({
    title: z.string({
        required_error: "Título é requerido",
        invalid_type_error: "Título é requerido",
    }).min(3, {
        message: "O título é muito curto"
    }),
    boardId: z.string(),
})
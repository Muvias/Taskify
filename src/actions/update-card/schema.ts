import { z } from 'zod'

export const UpdateCard = z.object({
    id: z.string(),
    boardId: z.string(),
    title: z.optional(
        z.string({
            required_error: "Título é requerido",
            invalid_type_error: "Título é requerido",
        }).min(3, {
            message: "O título é muito curto"
        })
    ),
    description: z.optional(
        z.string({
            required_error: "É necessário uma descrição",
            invalid_type_error: "É necessário uma descrição"
        }).min(3, {
            message: "Descrição muito curta"
        })
    ),
})
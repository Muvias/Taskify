import { z } from 'zod'

export const UpdateBoard = z.object({
    title: z.string({
        required_error: "Título é requerido",
        invalid_type_error: "Título é requerido",
    }).min(3, {
        message: "O título é muito curto"
    }),
    id: z.string(),
})
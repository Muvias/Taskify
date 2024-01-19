import { z } from 'zod'

export const CreateBoard = z.object({
    title: z.string({
        required_error: "Título é requerido",
        invalid_type_error: "Título é requerido",
    }).min(3, {
        message: "O título é muito curto"
    }),
    image: z.string({
        required_error: "Imagem é requerida",
        invalid_type_error: "Imagem é requerida"
    })
})
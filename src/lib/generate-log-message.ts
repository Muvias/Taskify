import { ACTION, AuditLog } from "@prisma/client";

export function generateLogMessage(log: AuditLog) {
    const { action, entityTitle, entityType } = log

    switch (action) {
        case ACTION.CREATE:
            return `${entityType.toLowerCase()} "${entityTitle}" criado`
        case ACTION.UPDATE:
            return `${entityType.toLowerCase()} "${entityTitle}" atualizado`
        case ACTION.DELETE:
            return `${entityType.toLowerCase()} "${entityTitle}" deletado`
        default:
            return `Ação desconhecida em ${entityType.toLowerCase()} "${entityTitle}"`
    }
}


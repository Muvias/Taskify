import { generateLogMessage } from "@/lib/generate-log-message"
import { AuditLog } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ActivityItemProps {
    data: AuditLog
}

export function ActivityItem({ data }: ActivityItemProps) {
    return (
        <li className="flex items-center gap-x-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src={data.userImage} />
            </Avatar>

            <div className="flex flex-col space-y-0.5">
                <p className="text-sm text-muted-foreground">
                    <span className="lowercase font-semibold text-neutral-700">{data.userName}</span> {generateLogMessage(data)}
                </p>

                <p className="text-xs text-muted-foreground">
                    {format(new Date(data.createdAt), "d MMM, yyyy 'às' h:mm a", { locale: ptBR })}
                </p>
            </div>
        </li>
    )
}

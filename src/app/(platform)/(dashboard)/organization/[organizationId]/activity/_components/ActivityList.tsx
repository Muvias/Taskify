import { ActivityItem } from "@/components/ActivityItem"
import { Skeleton } from "@/components/ui/skeleton"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { GhostIcon } from "lucide-react"
import { redirect } from "next/navigation"

interface ActivityListProps { }

export async function ActivityList({ }: ActivityListProps) {
    const { orgId } = auth()

    if (!orgId) {
        redirect("/select-org")
    }

    const auditLogs = await db.auditLog.findMany({
        where: {
            orgId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <ol className="mt-4 space-y-4">
            <p className="hidden last:flex items-center justify-center gap-2 text-sm text-muted-foreground">
                Nenhuma atividade dentro desta organização
                <GhostIcon className="w-5 h-5 text-muted-foreground" />
            </p>
            {auditLogs.map((log) => (
                <ActivityItem key={log.id} data={log} />
            ))}
        </ol>
    )
}

ActivityList.Skeleton = function ActivityListSkeleton() {
    return (
        <ol className="space-y-4 mt-4">
            <Skeleton className="w-4/5 h-14" />
            <Skeleton className="w-1/2 h-14" />
            <Skeleton className="w-3/4 h-14" />
            <Skeleton className="w-4/5 h-14" />
            <Skeleton className="w-3/4 h-14" />
        </ol>
    )
}

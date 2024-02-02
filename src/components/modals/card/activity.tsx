'use client'

import { ActivityItem } from "@/components/ActivityItem"
import { Skeleton } from "@/components/ui/skeleton"
import { AuditLog } from "@prisma/client"
import { ActivityIcon } from "lucide-react"

interface ActivityProps {
    items: AuditLog[]
}

export function Activity({ items }: ActivityProps) {
    return (
        <div className="flex items-start w-full gap-x-3">
            <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700" />

            <div className="w-full">
                <p className="mb-2 font-semibold text-neutral-700">
                    Atividade
                </p>

                <ol className="mt-2 space-y-4">
                    {items.map((item) => (
                        <ActivityItem
                            key={item.id}
                            data={item}
                        />
                    ))}
                </ol>
            </div>
        </div>
    )
}

Activity.Skeleton = function ActivitySkeleton() {
    return (
        <div className="flex items-start w-full gap-x-3">
            <Skeleton className="h-6 w-6 bg-neutral-200" />

            <div className="w-full">
                <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
                <Skeleton className="h-6 w-full bg-neutral-200" />
            </div>
        </div>
    )
}
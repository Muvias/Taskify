import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ListContainer } from "./_components/ListContainer"

interface PageProps {
    params: {
        boardId: string
    }
}

export default async function Page({ params }: PageProps) {
    const { orgId } = auth()

    if (!orgId) redirect("/select-org");

    const lists = await db.list.findMany({
        where: {
            boardId: params.boardId,
            board: {
                orgId,
            }
        },
        include: {
            Cards: {
                orderBy: {
                    order: "asc"
                }
            }
        },
        orderBy: {
            order: "asc"
        }
    })

    return (
        <div className="h-full p-4 overflow-x-auto">
            <ListContainer
                boardId={params.boardId}
                lists={lists}
            />
        </div>
    )
}

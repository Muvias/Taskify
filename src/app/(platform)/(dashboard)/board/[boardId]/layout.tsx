import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { notFound, redirect } from "next/navigation"
import { BoardNavbar } from "./_components/BoardNavbar";

export async function generateMetadata({ params }: { params: { boardId: string } }) {
    const { orgId } = auth()

    if (!orgId) {
        return {
            title: "Quadro"
        }
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    })

    return {
        title: board?.title || "Quadro"
    }
}

export default async function BoardIdLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { boardId: string }
}) {
    const { orgId } = auth()

    if (!orgId) redirect('/select-org');

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    })

    if (!board) {
        notFound()
    }

    return (
        <div
            style={{ backgroundImage: `url(${board.imageFullUrl})` }}
            className="relative h-full bg-no-repeat bg-cover bg-center"
        >
            <BoardNavbar board={board} />
            <div className="absolute inset-0 bg-black/10" />
            <main className="relative h-full pt-28">
                {children}
            </main>
        </div>
    )
}

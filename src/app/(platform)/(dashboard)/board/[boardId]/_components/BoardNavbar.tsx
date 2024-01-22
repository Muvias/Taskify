import { auth } from "@clerk/nextjs"
import { Board } from "@prisma/client"
import { BoardTitleForm } from "./BoardTitleForm"
import { BoardOptions } from "./BoardOptions"

interface BoardNavbarProps {
    board: Board
}

export async function BoardNavbar({ board }: BoardNavbarProps) {
    const { orgId } = auth()

    return (
        <div className="fixed top-14 flex items-center px-6 w-full h-14 gap-x-4 text-white bg-black/50 z-40">
            <BoardTitleForm board={board} />
            
            <div className="ml-auto">
                <BoardOptions id={board.id} />
            </div>
        </div>
    )
}

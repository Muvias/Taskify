import { db } from "@/lib/db"
import { Form } from "./form"

export default async function Page() {
    const boards = await db.board.findMany()

    return (
        <div className="flex flex-col space-y-4">
            <Form />

            <div className="flex flex-col space-y-2">
                {boards.map((board) => (
                    <span key={board.id}>
                        Título: {board.title}
                    </span>
                ))}
            </div>
        </div>
    )
}

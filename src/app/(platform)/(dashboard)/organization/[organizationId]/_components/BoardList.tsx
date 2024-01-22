import Link from "next/link";

import { redirect } from "next/navigation";

import { Hint } from "@/components/Hint";
import { FormPopover } from "@/components/form/formPopover";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { HelpCircleIcon, User2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export async function BoardList() {
    const { orgId } = auth()

    if (!orgId) return redirect("/select-org");

    const boards = await db.board.findMany({
        where: {
            orgId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2Icon className="w-6 h-6 mr-2" />
                Seus Quadros
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {boards.map((board) => (
                    <Link
                        key={board.id}
                        href={`/board/${board.id}`}
                        style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
                        className="group relative h-full w-full p-2 rounded-sm aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                        <p className="relative font-semibold text-white">
                            {board.title}
                        </p>
                    </Link>
                ))}
                <FormPopover side="right" sideOffset={10}>
                    <div
                        role="button"
                        className="relative flex flex-col items-center justify-center h-full w-full gap-y-1 aspect-video rounded-sm bg-muted hover:opacity-75 transition"
                    >
                        <p className="text-sm">
                            Criar novo quadro
                        </p>

                        <span className="text-xs">
                            5 restantes
                        </span>

                        <Hint
                            sideOffset={40}
                            description={`Os espaços de trabalho gratuitos podem ter até cinco quadros abertos. Para ter quadros ilimitados faça uma melhoria de espaço de trabalho.`}
                        >
                            <HelpCircleIcon className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    )
}

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
        </div>
    )
}
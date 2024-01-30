'use client'

import { FormInput } from "@/components/form/formInput"
import { Skeleton } from "@/components/ui/skeleton"
import { CardWithList } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { LayoutIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { ElementRef, useRef, useState } from "react"

interface HeaderProps {
    card: CardWithList
}

export function Header({ card }: HeaderProps) {
    const queryClient = useQueryClient()
    const params = useParams()

    const inputRef = useRef<ElementRef<"input">>(null)

    const [title, setTitle] = useState(card.title)

    function onBlur() {
        inputRef.current?.form?.requestSubmit()
    }

    function onSubmit(formData: FormData) {
        console.log(formData.get("title"))
    }

    return (
        <div className="flex items-start w-full gap-x-3 mb-6">
            <LayoutIcon className="w-5 h-5 mt-1 text-neutral-700" />

            <div className="w-full">
                <form action={onSubmit}>
                    <FormInput
                        id="title"
                        ref={inputRef}
                        onBlur={onBlur}
                        defaultValue={title}
                        className="relative w-[95%] -left-1.5 px-1 mb-0.5 font-semibold text-xl truncate text-neutral-700 bg-transparent border-transparent focus-visible:bg-white focus-visible:border-input"
                    />
                </form>

                <p className="text-sm text-muted-foreground">
                    na lista <span className="underline">{card.list.title}</span>
                </p>
            </div>
        </div>
    )
}

Header.Skeleton = function HeaderSkeleton() {
    return (
        <div className="flex items-start gap-x-3 mb-6">
            <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />

            <div>
                <Skeleton className="h-6 w-24 mb-1 bg-neutral-200" />
                <Skeleton className="h-4 w-12 mb-1 bg-neutral-200" />
            </div>
        </div>
    )
}

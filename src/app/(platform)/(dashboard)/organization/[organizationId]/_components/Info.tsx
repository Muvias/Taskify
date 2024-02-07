'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCardIcon } from "lucide-react";

import Image from "next/image";
import { boolean } from "zod";

interface InfoProps {
    isPro: boolean
}

export function Info({ isPro }: InfoProps) {
    const { organization, isLoaded } = useOrganization()

    if (!isLoaded) {
        return (
            <Info.Skeleton />
        )
    }

    return (
        <div className="flex items-center gap-x-4">
            <div className="relative w-[60px] h-[60px]">
                <Image
                    src={organization?.imageUrl!}
                    alt="Organização"
                    fill
                    className="rounded-md object-cover"
                />
            </div>

            <div className="space-y-1">
                <p className="text-xl font-semibold">
                    {organization?.name}
                </p>

                <div className="flex items-center text-xs text-muted-foreground">
                    <CreditCardIcon className="h-3 w-3 mr-1" />
                    {isPro ? "Pro" : "Grátis"}
                </div>
            </div>
        </div>
    )
}

Info.Skeleton = function SkeletonInfo() {
    return (
        <div className="flex items-center gap-x-4">
            <div className="relative w-[60px] h-[60px]">
                <Skeleton className="w-full h-full absolute" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-10 w-[200px]" />
            </div>

            <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-2" />
                <Skeleton className="h-4 w-[100px]" />
            </div>
        </div>
    )
}

'use client'

import Image from "next/image"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { ActivityIcon, CreditCardIcon, LayoutIcon, SettingsIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export type Organization = {
    id: string
    slug: string
    imageUrl: string
    name: string
}

interface NavItemProps {
    isActive: boolean
    isExpanded: boolean
    organization: Organization
    onExpand: (id: string) => void
}

export function NavItem({ isActive, isExpanded, organization, onExpand }: NavItemProps) {
    const router = useRouter()
    const path = usePathname()

    const routes = [
        {
            label: "Quadro",
            icon: <LayoutIcon className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}`
        },
        {
            label: "Atividade",
            icon: <ActivityIcon className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/activity`
        },
        {
            label: "Configurações",
            icon: <SettingsIcon className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/settings`
        },
        {
            label: "Cobrança",
            icon: <CreditCardIcon className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/billing`
        },
    ]

    function onClick(href: string) {
        router.push(href)
    }

    return (
        <AccordionItem
            value={organization.id}
            className="border-none"
        >
            <AccordionTrigger
                onClick={() => onExpand(organization.id)}
                className={cn('flex items-center gap-x-2 p-1.5 rounded-md text-start text-neutral-700 hover:bg-neutral-500/10 transition no-underline hover:no-underline',
                    isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
                )}
            >
                <div className="flex items-center gap-x-2">
                    <div className="w-7 h-7 relative">
                        <Image
                            src={organization.imageUrl}
                            alt="Organização"
                            fill
                            className="rounded-sm object-cover"
                        />
                    </div>

                    <span className="text-sm font-medium">
                        {organization.name}
                    </span>
                </div>
            </AccordionTrigger>

            <AccordionContent className="pt-1 text-neutral-700">
                {routes.map((route) => (
                    <Button
                        key={route.href}
                        size='sm'
                        onClick={() => onClick(route.href)}
                        variant="ghost"
                        className={cn('w-full justify-start pl-10 mb-1 font-normal',
                            path === route.href && "bg-sky-500/10 text-sky-700"
                        )}
                    >
                        {route.icon}
                        {route.label}
                    </Button>
                ))}
            </AccordionContent>
        </AccordionItem >
    )
}

NavItem.Skeleton = function SkeletonNavItem() {
    return (
        <div className="flex items-center gap-x-2">
            <div className="relative w-10 h-10 shrink-0">
                <Skeleton className="absolute h-full w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    )
}

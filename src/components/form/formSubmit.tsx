"use client"

import { cn } from "@/lib/utils"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"

interface FormSubmitProps {
    children: React.ReactNode
    variant?: "default" | "destructive" | "outline" | "primary" | "secondary" | "ghost" | "link"
    className?: string
    disabled?: boolean
}

export function FormSubmit({
    children,
    variant,
    className,
    disabled
}: FormSubmitProps) {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            size="sm"
            variant={variant}
            className={cn(className)}
            disabled={pending || disabled}
        >
            {children}
        </Button>
    )
}

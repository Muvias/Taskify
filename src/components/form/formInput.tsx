"use client"

import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { useFormStatus } from "react-dom"

import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { FormErrors } from "./formErrors"

interface FormInputProps {
    id: string
    label?: string
    type?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    errors?: Record<string, string[] | undefined>
    className?: string
    defaultValue?: string
    onBlur?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
    id,
    label,
    type,
    placeholder,
    required,
    disabled,
    errors,
    className,
    defaultValue,
    onBlur
}, ref) => {
    const { pending } = useFormStatus()

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                {label ? (
                    <Label
                        htmlFor={id}
                        className="text-xs font-semibold text-neutral-700"
                    >
                        {label}
                    </Label>
                ) : null}
                <Input
                    id={id}
                    name={id}
                    ref={ref}
                    type={type}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    required={required}
                    disabled={pending || disabled}
                    className={cn("h-7 px-2 py-1 text-sm", className)}
                    aria-describedby={`${id}-error`}
                />
            </div>

            <FormErrors
                id={id}
                errors={errors}
            />
        </div>
    )
})

FormInput.displayName = "FormInput"

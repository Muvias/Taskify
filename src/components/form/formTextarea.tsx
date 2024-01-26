"use client"

import { cn } from "@/lib/utils"
import { KeyboardEventHandler, forwardRef } from "react"
import { useFormStatus } from "react-dom"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { FormErrors } from "./formErrors"

interface FormTextareaProps {
    id: string
    label?: string
    placeholder?: string
    defaultValue?: string
    required?: boolean
    disabled?: boolean
    errors?: Record<string, string[] | undefined>
    className?: string
    onBlur?: () => void
    onClick?: () => void
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    ({ id, className, disabled, errors, label, defaultValue, onBlur, onClick, onKeyDown, placeholder, required }, ref) => {
        const { pending } = useFormStatus()

        return (
            <div className="w-full space-y-2">
                <div className="w-full space-y-1">
                    {label ? (
                        <Label
                            htmlFor={id}
                            className="text-xs font-semibold text-neutral-700"
                        >
                            {label}
                        </Label>
                    ) : null}

                    <Textarea
                        ref={ref}
                        id={id}
                        name={id}
                        onKeyDown={onKeyDown}
                        onBlur={onBlur}
                        onClick={onClick}
                        required={required}
                        placeholder={placeholder}
                        disabled={pending || disabled}
                        className={cn(
                            "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
                            className
                        )}
                        aria-describedby={`${id}-error`}
                        defaultValue={defaultValue}
                    />
                </div>

                <FormErrors
                    id={id}
                    errors={errors}
                />
            </div>
        )
    }
)

FormTextarea.displayName = "FormTextarea"

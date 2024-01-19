'use client'

import Image from "next/image"
import Link from "next/link"

import { CheckIcon, Loader2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"

import { defaultImages } from "@/constants/images"
import { unsplash } from "@/lib/unsplash"
import { cn } from "@/lib/utils"
import { FormErrors } from "./formErrors"

interface FormPickerProps {
    id: string
    errors?: Record<string, string[] | undefined>
}

export function FormPicker({ id, errors }: FormPickerProps) {
    const { pending } = useFormStatus()

    const [images, setImages] = useState<Array<Record<string, any>>>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedImageId, setSelectedImageId] = useState(null)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ["317099"],
                    count: 9,
                })

                if (result && result.response) {
                    const newImages = (result.response as Array<Record<string, any>>)
                    setImages(newImages)
                } else {
                    console.error("Failed to get images from unsplash.")
                }
            } catch (error) {
                console.log({ error })
                setImages(defaultImages)
            } finally {
                setIsLoading(false)
            }
        }

        fetchImages()
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6">
                <Loader2Icon className="w-6 h-6 animate-spin text-sky-700" />
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 mb-2">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={cn("relative aspect-video cursor-pointer group bg-muted hover:opacity-75 transition",
                            pending && "opacity-50 hover:opacity-50 cursor-auto"
                        )}
                        onClick={() => {
                            if (pending) return;

                            setSelectedImageId(image.id)
                        }}
                    >
                        <input
                            id={id}
                            name={id}
                            type="radio"
                            className="hidden"
                            checked={selectedImageId === image.id}
                            readOnly
                            disabled={pending}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                        />
                        <Image
                            src={image.urls.thumb}
                            alt="Unsplash image"
                            fill
                            className="object-cover rounded-sm"
                        />
                        {selectedImageId === image.id && (
                            <div className="absolute flex items-center justify-center w-full h-full inset-y-0 bg-black/30">
                                <CheckIcon className="h-4 w-4 text-white" />
                            </div>
                        )}
                        <Link
                            href={image.links.html}
                            target="_blank"
                            className="absolute bottom-0 w-full p-1 text-[10px] text-white bg-black/50 opacity-0 group-hover:opacity-100 hover:underline truncate"
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>

            <FormErrors
                id="image"
                errors={errors}
            />
        </div>
    )
}

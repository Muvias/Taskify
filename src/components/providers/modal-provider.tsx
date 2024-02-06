'use client'

import { ProModal } from "@/components/modals/ProModal"
import { CardModal } from "@/components/modals/card"
import { useEffect, useState } from "react"

export function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <CardModal />
            <ProModal />
        </>
    )
}
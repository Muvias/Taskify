import { ModalProvider } from "@/components/providers/modal-provider"
import { QueryProvider } from "@/components/providers/query-provider"

import { ptBR } from "@clerk/localizations"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"

export default function PlatformLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider localization={ptBR}>
            <QueryProvider>
                <Toaster richColors />
                <ModalProvider />
                {children}
            </QueryProvider>
        </ClerkProvider>
    )
}

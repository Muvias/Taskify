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
            <Toaster richColors />
            {children}
        </ClerkProvider>
    )
}

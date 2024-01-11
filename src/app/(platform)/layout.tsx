import { ptBR } from "@clerk/localizations"
import { ClerkProvider } from "@clerk/nextjs"

export default function PlatformLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider localization={ptBR}>
            {children}
        </ClerkProvider>
    )
}

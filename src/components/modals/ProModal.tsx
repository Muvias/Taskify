'use client'

import { useProModal } from "@/hooks/useProModal"
import { Dialog, DialogContent } from "../ui/dialog"
import Image from "next/image"
import { Button } from "../ui/button"
import { useAction } from "@/hooks/use-action"
import { stripeRedirect } from "@/actions/stripe-redirect"
import { toast } from "sonner"

export function ProModal() {
    const proModal = useProModal()

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = data;
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    function onClick() {
        execute({})
    }

    return (
        <Dialog
            open={proModal.isOpen}
            onOpenChange={proModal.onClose}
        >
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <div className="relative flex items-center justify-center aspect-video">
                    <Image
                        src='/hero.svg'
                        alt="Imagem herói"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="p-6 space-y-6 mx-auto text-neutral-700">
                    <h2 className="font-semibold text-xl">
                        Faça Upgrade para o Taskify Pro Hoje!
                    </h2>

                    <p className="text-xs font-semibold text-neutral-600">
                        Explore o melhore do Taskify
                    </p>

                    <div className="pl-3">
                        <ul className="text-sm list-disc">
                            <li>Quadros ilimitados</li>
                            <li>Listas de verificação avançadas</li>
                            <li>Recursos de administração e segurança</li>
                            <li>E mais!</li>
                        </ul>
                    </div>

                    <Button
                        variant="primary"
                        onClick={onClick}
                        disabled={isLoading}
                        className="w-full"
                    >
                        Upgrade
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <div className="fixed flex bottom-0 w-full p-4 border-t bg-slate-100">
            <div className="md:max-w-screen-2xl flex items-center justify-between w-full mx-auto">
                <Logo />
                <div className="md:block flex items-center justify-between w-full md:w-auto space-x-4">
                    <Button size='sm' variant='ghost' className="hover:opacity-95">
                        Política de Privacidade
                    </Button>

                    <Button size='sm' variant='ghost' className="hover:opacity-95">
                        Termos de Serviço
                    </Button>
                </div>
            </div>
        </div>
    )
}

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
    return (
        <div className="fixed flex items-center top-0 w-full h-14 px-4 border-b shadow-sm bg-white">
            <div className="md:max-w-screen-2xl flex items-center justify-between w-full mx-auto">
                <Logo />
                <div className="md:block flex items-center justify-between w-full md:w-auto space-x-4">
                    <Button
                        size='sm'
                        variant='outline'
                        asChild
                    >
                        <Link
                            href='/sign-in'
                        >
                            Entrar
                        </Link>
                    </Button>

                    <Button
                        size='sm'
                        asChild
                    >
                        <Link
                            href='/sign-up'
                        >
                            Obtenha o Taskify grátis
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center p-4 mb-4 border rounded-full shadow-sm uppercase bg-amber-100 text-amber-700">
                    <Medal className="h-6 w-6 mr-2" />
                    Seu gerenciador de tarefas Nº1
                </div>
                <h1 className="text-3xl md:text-6xl text-center mb-6 font-semibold text-neutral-800">
                    Taskify ajuda as equipes a levarem
                </h1>
                <div className="text-3xl md:text-6xl w-fit p-2 px-4 pb-4 rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-medium">
                    o trabalho adiante
                </div>
            </div>

            <div className="max-w-xs md:max-w-2xl mt-4 mx-auto text-sm text-center md:text-xl text-neutral-400">
                Colaborar, gerenciar projetos, e alcançar novos picos de produtividade. Dos andares mais altos ao home-office, a forma como sua equipe trabalha é única - realize tudo isso com Taskify.
            </div>

            <Button
                className="mt-6"
                size="lg"
                asChild
            >
                <Link
                    href="/sign-up"
                >
                    Obtenha o Taskify grátis
                </Link>
            </Button>
        </div>
    )
}

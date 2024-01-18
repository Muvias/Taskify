import { Hint } from "@/components/Hint";
import { FormPopover } from "@/components/form/formPopover";
import { HelpCircleIcon, User2Icon } from "lucide-react";

export function BoardList() {
    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2Icon className="w-6 h-6 mr-2" />
                Seus Quadros
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <FormPopover side="right" sideOffset={10}>
                    <div
                        role="button"
                        className="relative flex flex-col items-center justify-center h-full w-full gap-y-1 aspect-video rounded-sm bg-muted hover:opacity-75 transition"
                    >
                        <p className="text-sm">
                            Criar novo quadro
                        </p>

                        <span className="text-xs">
                            5 restantes
                        </span>

                        <Hint
                            sideOffset={40}
                            description={`Os espaços de trabalho gratuitos podem ter até cinco quadros abertos. Para ter quadros ilimitados faça uma melhoria de espaço de trabalho.`}
                        >
                            <HelpCircleIcon className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    )
}

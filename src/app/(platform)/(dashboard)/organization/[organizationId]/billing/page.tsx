import { Separator } from "@/components/ui/separator"
import { checkSubscription } from "@/lib/subscription"
import { Info } from "../_components/Info"
import { SubscriptionButton } from "./_components/SubscriptionButton"

export default async function Page() {
    const isPro = await checkSubscription()

    return (
        <div className="w-full">
            <Info isPro={isPro} />

            <Separator className="my-2" />

            <SubscriptionButton
                isPro={isPro}
            />
        </div>
    )
}

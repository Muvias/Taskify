import { startCase } from "lodash"

import { OrgControl } from "./_components/OrgControl"
import { auth } from "@clerk/nextjs"

export async function generateMetadata() {
    const { orgSlug } = auth()

    return {
        title: startCase(orgSlug || "organização")
    }
}

export default function OrganizationIdLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <OrgControl />
            {children}
        </>
    )
}

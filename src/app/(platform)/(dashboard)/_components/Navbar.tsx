import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import { MobileSidebar } from "./MobileSidebar";
import { FormPopover } from "@/components/form/formPopover"

export function Navbar() {
    return (
        <nav className="fixed top-0 flex items-center w-full h-14 px-4 border-b shadow-sm z-50 bg-white">
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
                
                <FormPopover
                    align="start"
                    side="bottom"
                    sideOffset={18}
                >
                    <Button size='sm' className="hidden md:block h-auto py-1.5 px-4 rounded-sm" variant='primary'>
                        Criar
                    </Button>
                </FormPopover>

                <FormPopover>
                    <Button size='sm' className="block md:hidden rounded-sm" variant='primary'>
                        <PlusIcon className="w-4 h-4" />
                    </Button>
                </FormPopover>
            </div>

            <div className="flex items-center gap-x-2 ml-auto">
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl='/organization/:id'
                    afterLeaveOrganizationUrl='/select-org'
                    afterSelectOrganizationUrl='/organization/:id'
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        }
                    }}
                />
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30,
                            }
                        }
                    }}
                />
            </div>
        </nav>
    )
}

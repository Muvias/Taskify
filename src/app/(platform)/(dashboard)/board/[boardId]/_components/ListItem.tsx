import { ListWithCards } from "@/types"
import { ListHeader } from "./ListHeader"

interface ListItemProps {
    index: number
    list: ListWithCards
}

export function ListItem({ index, list }: ListItemProps) {
    return (
        <li className="h-full w-[272px] shrink-0 select-none">
            <div className="w-full pb-2 rounded-md shadow-md bg-[#f1f2f4]">
                <ListHeader
                    list={list}
                />
            </div>
        </li>
    )
}

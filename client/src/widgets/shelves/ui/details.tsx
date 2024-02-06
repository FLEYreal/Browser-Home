// Shadcn / Tailwind
import { ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuItem } from "@/shared/ui/context-menu";
import { Info } from "lucide-react";


// Interfaces
export interface DetailsProps {
    details: {
        shelf_id: number;
        created_at: string;
        item_amount: number;
    }
}

export default function Details({ details }: DetailsProps) {

    // Get additional shelf's info
    const { shelf_id, created_at, item_amount } = details;

    return (
        <ContextMenuSub>

            {/* Context menu button */}
            <ContextMenuSubTrigger className="flex flex-row gap-2 items-center">
                <Info size={16} />
                Details
            </ContextMenuSubTrigger>

            {/* Wrapper */}
            <ContextMenuSubContent className="w-auto px-8 py-4 flex flex-col gap-2">

                {/* Show unique ID */}
                <div>
                    <div className="text-xs">Unique ID</div>
                    <div className="text-sm">{shelf_id}</div>
                </div>

                {/* Show creation date */}
                <div>
                    <div className="text-xs">Shelf Creation Time</div>
                    <div className="text-sm">{created_at.split("T")[0]}</div>
                </div>

                {/* Amount of Items in the shelf */}
                <div>
                    <div className="text-xs">Items inside</div>
                    <div className="text-sm">{item_amount}</div>
                </div>

            </ContextMenuSubContent>
        </ContextMenuSub>
    )

}
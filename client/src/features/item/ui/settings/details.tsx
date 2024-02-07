// Shadcn / Tailwind
import { ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent } from "@/shared/ui/context-menu";
import { Info } from "lucide-react";

// Interfaces
export interface DetailsProps {
    details: {
        shelf_fk: number;
        item_id: number;
        created_at: string;
        description?: string;
    }
}

// Additional details about item and it's shelf
export default function Details({ details }: DetailsProps) {

    // Get additional item's info
    const { shelf_fk, item_id, created_at, description } = details;

    return (
        <ContextMenuSub>

            {/* Context menu button */}
            <ContextMenuSubTrigger className="flex flex-row gap-2 items-center">
                <Info size={16} />
                Details
            </ContextMenuSubTrigger>

            {/* Wrapper */}
            <ContextMenuSubContent className="w-auto px-8 py-4 flex flex-col gap-3">

                <div className="flex flex-row gap-6">

                    {/* Show shelf unique ID the item belongs to */}
                    <div>
                        <div className="text-xs">Shelf ID</div>
                        <div className="text-sm">{shelf_fk}</div>
                    </div>

                    {/* Show Item's Unique ID */}
                    <div>
                        <div className="text-xs">Item ID</div>
                        <div className="text-sm">{item_id}</div>
                    </div>

                </div>

                {/* Show Item's Description */}
                <div>
                    <div className="text-xs">Item's Description</div>
                    <div className="text-sm">{description || '<No Description Provided>'}</div>
                </div>

                {/* Show creation date */}
                <div>
                    <div className="text-xs">Item Creation Time</div>
                    <div className="text-sm">{created_at.split("T")[0]}</div>
                </div>

            </ContextMenuSubContent>
        </ContextMenuSub>
    )

}
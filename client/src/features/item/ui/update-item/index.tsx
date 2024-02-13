// Basics
import { ReactNode } from "react";

// Shadcn / Tailwind
import {
    Dialog,
    DialogTrigger,
} from "@/shared/ui/dialog";

// Shared
import { updateItemBody } from "@/shared/api/item-api";

// Insides
import UpdateItemDialogContent from "./content";

export default function UpdateItemDialog({
    children,
    data = { item_id: -1 }
}: {
    children: ReactNode,
    data: updateItemBody[number]
}) {

    return (
        <Dialog>

            {/* Trigger (Mostly button) to open dialog */}
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            {/* Content of the dialog */}
            <UpdateItemDialogContent data={data} />

        </Dialog>
    )

}
// Basics
import { ReactNode } from "react";

// Shadcn / Tailwind
import {
    Dialog,
    DialogTrigger,
} from "@/shared/ui/dialog";

import CreateItemDialogContent from "./content";

export default function CreateItemDialog({
    children,
    defaultShelf = -1
}: {
    children: ReactNode,
    defaultShelf?: number
}) {

    return (
        <Dialog>

            {/* Trigger (Mostly button) to open dialog */}
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            {/* Content of the dialog */}
            <CreateItemDialogContent defaultShelf={defaultShelf} />

        </Dialog>
    )

}
// Basics
import { ReactNode } from "react";

// Shadcn / Tailwind
import {
    AlertDialog,
    AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";

import DeleteItemDialogContent from "./content";

export default function DeleteItemDialog({
    children,
    id = -1
}: {
    children: ReactNode,
    id?: number
}) {

    return (
        <AlertDialog>

            {/* Trigger (Mostly button) to open dialog */}
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>

            {/* Content of the dialog */}
            <DeleteItemDialogContent id={id}/>

        </AlertDialog>
    )

}
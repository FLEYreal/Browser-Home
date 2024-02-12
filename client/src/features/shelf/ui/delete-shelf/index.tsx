// Basics
import { ReactNode } from 'react';

// Shadcn / Tailwind
import { AlertDialog, AlertDialogTrigger } from "@/shared/ui/alert-dialog";

// Insides
import DeleteShelfDialogContent from './content';

// Common modal window for shelf deletion
const DeleteShelfDialog = ({ children, id }: { children: ReactNode, id?: number }) => (
    <AlertDialog>

        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>

        <DeleteShelfDialogContent id={id} />

    </AlertDialog>
)

export default DeleteShelfDialog;
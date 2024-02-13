// Basics
import { ReactNode } from 'react';

// Shadcn / Tailwind
import { Dialog, DialogTrigger } from "@/shared/ui/dialog";

// Insides
import CreateShelfDialogContent from './content';

// Common modal window for shelf creation
const CreateShelfDialog = ({ children }: { children: ReactNode }) => (
    <Dialog>

        <DialogTrigger asChild>
            {children}
        </DialogTrigger>

        <CreateShelfDialogContent />

    </Dialog>
)

export default CreateShelfDialog;
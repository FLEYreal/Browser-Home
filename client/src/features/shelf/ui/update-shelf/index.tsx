// Basics
import { ReactNode } from 'react';

// Shadcn / Tailwind
import { Dialog, DialogTrigger } from "@/shared/ui/dialog";

// Shared
import { updateShelvesBody } from '@/shared/api/shelf-api';

// Insides
import CreateShelfDialogContent from './content';

// Common modal window for shelf creation
const EditShelfDialog = ({ 
    children, 
    data = { shelf_id: -1 }
}: { 
    children: ReactNode, 
    data?: updateShelvesBody[number]
}) => (
    <Dialog>

        <DialogTrigger asChild>
            {children}
        </DialogTrigger>

        <CreateShelfDialogContent data={data}/>

    </Dialog>
)

export default EditShelfDialog;
// Basics
import { Dispatch, SetStateAction, ReactNode } from 'react';

// Shadcn / Tailwind
import { Dialog, DialogTrigger } from "@/shared/ui/dialog";

// Shared
import { updateShelvesBody } from '@/shared/api/shelf-api';

// Insides
import UpdateShelfDialogContent from './content';
import { ShelfDataProps } from '../../config/types';

// Common modal window for shelf creation
const UpdateShelfDialog = ({ 
    children, 
    data = { shelf_id: -1 },
    setData = () => { },
}: { 
    children: ReactNode, 
    data?: updateShelvesBody[number],
    setData: Dispatch<SetStateAction<ShelfDataProps>>
}) => (
    <Dialog>

        <DialogTrigger asChild>
            {children}
        </DialogTrigger>

        <UpdateShelfDialogContent setData={setData} data={data}/>

    </Dialog>
)

export default UpdateShelfDialog;
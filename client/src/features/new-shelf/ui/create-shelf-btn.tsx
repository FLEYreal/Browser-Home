'use client'

// Shadcn / Tailwind
import { Button, ButtonProps } from "@/shared/ui/button";

// Interfaces & Types
export interface CreateShelfWidgetProps extends ButtonProps { }

// Insides
import ShelfBtnHoverCard from "./shelf-btn-hover-card";
import CreateShelfDialog from "./create-shelf-dialog";

export default function CreateShelfBtn({ ...props }: CreateShelfWidgetProps) {

    return (
        <ShelfBtnHoverCard>
            <CreateShelfDialog>
                <Button variant="secondary" {...props}>New Shelf</Button>
            </CreateShelfDialog>
        </ShelfBtnHoverCard>
    )
}
'use client'

// Shadcn / Tailwind
import { Button, ButtonProps } from "@/shared/ui/button";

// Interfaces & Types
export interface CreateShelfWidgetProps extends ButtonProps { }

// Insides
import CreateShelfDialog from ".";

export default function CreateShelfBtn({ ...props }: CreateShelfWidgetProps) {

    return (
        <CreateShelfDialog>
                <Button variant="secondary" {...props}>New Shelf</Button>
        </CreateShelfDialog>
    )
}
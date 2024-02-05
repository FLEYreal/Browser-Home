'use client'

// Basics
import { HTMLAttributes } from "react";

// Shadcn / Tailwind
import { Button } from "@/shared/ui/button";
import { Plus as PlusIcon } from "lucide-react";

// Insides
import CreateShelfDialog from "./create-shelf-dialog";

// Interfaces & Types
export interface CreateShelfWidgetProps extends HTMLAttributes<HTMLDivElement> { }

export default function CreateShelfWidget({ ...props }: CreateShelfWidgetProps) {

    return (
        <CreateShelfDialog>
            <div {...props} className={`flex ${props.className}`}>
                <Button variant="secondary" className="py-6 flex-1">
                    <PlusIcon />
                </Button>
            </div>
        </CreateShelfDialog>
    )
}
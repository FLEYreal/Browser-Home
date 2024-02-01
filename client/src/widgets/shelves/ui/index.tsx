
// Basics
import { HTMLAttributes } from "react";

// Interfaces
export interface ShelvesProps extends HTMLAttributes<HTMLDivElement> {

}

export default function Shelves({ ...props }: ShelvesProps) {
    return (
        <div {...props}>
            Shelves will be here
        </div>
    )
}
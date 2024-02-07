// Basics
import { HTMLAttributes } from "react";

// Insides
import ShelfSettings from "../settings";
import ShelfHeader from "./header";
import ShelfItems from "./items";

// Interfaces
export interface ShelvesProps extends HTMLAttributes<HTMLDivElement> { }

// Wrapper of the shelf
export default function Shelf({ ...props }: ShelvesProps) {

    return (
        // Shelf settings is a wrapper that lets using context-menu
        // for settings. Right click on shelf and open menu with options
        <ShelfSettings>

            {/* Shelf's wrapper */}
            <div
                {...props}
                className={` ${props?.className} mb-10 `}
            >

                {/* Shelf's header */}
                <ShelfHeader />

                {/* Shelf's content (Contains all items) */}
                <ShelfItems />
            </div>

        </ShelfSettings>
    )
}
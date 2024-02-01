'use client'

// Basics
import { ReactNode } from "react";

// Shadcn / Tailwind
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@/shared/ui/hover-card";

export default function ShelfBtnHoverCard({ children }: { children: ReactNode }) {

    return (
        <HoverCard>

            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>

            <HoverCardContent className="text-center w-auto px-6">
                Click to create new shelf!
            </HoverCardContent>

        </HoverCard>
    )

}
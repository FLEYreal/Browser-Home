'use client'

// Basics
import { HTMLAttributes } from "react";

// Shadcn / Tailwind
import { Button } from "@/shared/ui/button";

// Display a plain message of unavailability with button to refetch
export interface BtnFallbackProps extends HTMLAttributes<HTMLDivElement> {
    refetch: () => void;
    item?: string;
}
export const BtnFallback = ({ 
    refetch, 
    item = 'items', 
    ...props
}: BtnFallbackProps) => {

    return (
        <div
            {...props}
            className={`
                flex flex-col items-center justify-center h-20
                ${props?.className}
            `}
        >
            <h2 className="text-xl opacity-50 mb-3">Sorry, but We're unable to load {item}! Try Later!</h2>
            <Button
                variant="secondary"
                onClick={() => refetch()}
            >
                Refetch
            </Button>
        </div>
    )

}

// Red Destructive Window with error message (Unable to refetch)
export const DestructiveFallback = () => {
    return (
        <>DestructiveFallback</>
    )
}
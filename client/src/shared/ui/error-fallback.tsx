'use client'

// Basics
import { HTMLAttributes } from "react";

// Shadcn / Tailwind
import { Button } from "@/shared/ui/button";
import { useToast } from "./use-toast";
import { BackendResponseType } from "../config/types";

// Display a plain message of unavailability with button to refetch
export interface BtnFallbackProps extends HTMLAttributes<HTMLDivElement> {
    refetch: () => void;
    item?: string;
    response?: BackendResponseType;
}
export const BtnFallback = ({ 
    refetch, 
    item = 'items',
    response,
    ...props
}: BtnFallbackProps) => {

    // Toast to display notifications
    const { toast } = useToast()

    // Show toast if error response is provided
    if(response) {
        toast({
            title: response.title,
            description: response.description,
            variant: 'destructive'
        })
    }
    
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
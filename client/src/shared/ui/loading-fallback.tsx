// Basics
import { HTMLAttributes } from "react";

// Shadcn / Tailwind
import { LoadIndicator } from "./load-indicator";

// Display a message with loading indicator, used in the case of... loading element!
export interface BtnFallbackProps extends HTMLAttributes<HTMLDivElement> {
    message?: string;
}
export const LoadingFallback = ({ message, ...props }: BtnFallbackProps) => {

    return (
        <div
            {...props}
            className={`
                flex flex-row items-center justify-center gap-3
                ${props?.className}
            `}
        >
            <LoadIndicator className="text-xl opacity-50" />
            <h2 className="text-xl opacity-50">{message || 'Loading...'}</h2>
        </div>
    )

}

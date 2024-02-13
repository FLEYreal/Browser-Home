// Basics
import { HTMLAttributes } from "react";

// Interfaces
export interface currentLengthProps extends HTMLAttributes<HTMLDivElement> {
    current: number;
    limit: number;
}

// Displays current length and turns red when length exceeds limit
export const CurrentLength: React.FC<currentLengthProps> = ({ current, limit, ...props }) => {

    return (
        <div
            {...props}
            className={`
                text-sm absolute right-2 bottom-2 backdrop-blur-sm
                rounded-lg px-[3px] py-[1px] select-none
                ${props.className}
            `}>
            <span className={current > limit ? 'text-red-500' : ''}>
                {current}/{limit}
            </span>
        </div>
    )

}
// Basics
import { HTMLAttributes } from "react";

// Component to show while currencies loading
export default function CurrencyLoading({ ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className='flex gap-5' {...props}>
            <span className='h-5 w-14 animate-pulse bg-gray-700 rounded-lg'></span>
            <span className='h-5 w-16 animate-pulse bg-gray-700 rounded-lg'></span>
        </div>
    )
}
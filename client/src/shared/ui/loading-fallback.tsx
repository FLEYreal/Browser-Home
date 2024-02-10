// Basics
import { HTMLAttributes } from "react";
import Link from 'next/link';

// Shadcn / Tailwind
import { LoadIndicator } from "./load-indicator";
import { Link as LinkIcon } from 'lucide-react';
import { Button } from '@/shared/ui/button';

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

// Component to show while loading entire page
export const LoadingComponent = (
    { message = 'Preparing Browser-Home just for you...' }:
        { message?: string }
) => (

    // Show stuff until theme's loaded
    <section className={`z-50 absolute top-0 left-0 bg-black w-screen h-screen flex justify-center items-center flex-col`}>

        <h1 className='text-white text-3xl mb-3 flex flex-row gap-4 items-center justify-center'>
            <LoadIndicator />Loading Browser-Home...
        </h1>
        <h2 className='text-slate-400 text-lg text-center'>{message}</h2>
        <Link href='https://google.com' className='mt-4'>
            <Button variant="link">
                <LinkIcon size="16" className='mr-2' /> Go to Google
            </Button>
        </Link>

    </section>

)

'use client'

// Basics
import { ReactNode, Dispatch, SetStateAction, useState, useLayoutEffect } from 'react'
import Link from 'next/link';

// Shadcn / Tailwin
import { Link as LinkIcon } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { LoadIndicator } from '@/shared/ui/load-indicator';

// Shared
import { DesignContext, designType } from '@/shared/utils/design-context';

export const LoadingDesignProvider = () => (

    // Show stuff until theme's loaded
    <body className={`bg-black w-screen h-screen flex justify-center items-center flex-col`}>

        <h1 className='text-white text-3xl mb-6 flex flex-row gap-4 items-center justify-center'>
            <LoadIndicator />Loading Themes...
        </h1>
        <h2 className='text-slate-400 text-lg text-center'>Wait a bit until we prepare nice styles for your page!</h2>
        <Link href='https://google.com' className='mt-1'>
            <Button variant="link">
                <LinkIcon size="16" className='mr-2' /> Just Wanna Google
            </Button>
        </Link>

    </body>

)

export default function DesignProvider({ children }: { children: ReactNode }) {

    // Setup default design
    const [design, setDesign] = useState<designType | null>(null)

    // State to track whether the design is loaded
    // Without it, theme would be flinkering each page enter
    const [isDesignLoaded, setIsDesignLoaded] = useState(false);

    // Save / Update design state in localStorage
    useLayoutEffect(() => {
        if (design && localStorage.getItem('design') !== design) {
            localStorage.setItem('design', design)
        }
    }, [design])

    // Load design from localStorage on initial render
    useLayoutEffect(() => {
        const storedDesign = localStorage.getItem('design') as designType;
        if (storedDesign) {
            setDesign(storedDesign);
        }
        setIsDesignLoaded(true);
    }, [])

    return (
        <DesignContext.Provider value={{
            design: design as designType,
            setDesign: setDesign as Dispatch<SetStateAction<designType>>
        }}>

            {
                isDesignLoaded ? (
                    <body className={`${design} bg-background`}>
                        {children}
                    </body>
                ) : <LoadingDesignProvider />
            }

        </DesignContext.Provider>
    )
}
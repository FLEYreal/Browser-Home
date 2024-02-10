'use client'

import React, {
    ReactNode,
    Dispatch,
    SetStateAction,
    useState,
    useLayoutEffect
} from 'react';

// Shared
import { DesignContext, designType } from '@/shared/utils/design-context';

export const designQueueItem = {
    id: 1,
    name: 'design',
    message: 'Wait a second, we\'re implementing nice styles for you...'
}

// Provider for the current theme & design of the browser-home
export default function DesignProvider({ children }: { children: ReactNode }) {

    // Setup default design
    const [design, setDesign] = useState<designType | null>(null);

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
    }, [])

    return (
        <DesignContext.Provider value={{
            design: design as designType,
            setDesign: setDesign as Dispatch<SetStateAction<designType>>
        }}>
            <main className={`${design} bg-background w-screen min-h-screen absolute top-0 left-0`}>
                {children}
            </main>
        </DesignContext.Provider>
    )
}

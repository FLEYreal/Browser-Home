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
import { useLoadingContext } from '@/shared/utils/loading-context';

// Provider for the current theme & design of the browser-home
export default function DesignProvider({ children }: { children: ReactNode }) {

    // Context data
    const { queue, setQueue } = useLoadingContext();

    // Setup default design
    const [design, setDesign] = useState<designType | null>(null);

    // Save / Update design state in localStorage
    useLayoutEffect(() => {
        if (design && localStorage.getItem('design') !== design) {

            // Removes old theme from body
            document.body.classList.remove(localStorage.getItem('design') as string)

            // Add newest theme & Save to storage
            document.body.classList.add(design)
            localStorage.setItem('design', design)
        }

    }, [design])

    // Load design from localStorage on initial render
    useLayoutEffect(() => {
        const storedDesign = localStorage.getItem('design') as designType;
        if (storedDesign) {
            setDesign(storedDesign); // If theme is stored, set it
            document.body.classList.add(storedDesign) // Add theme to body
        }

        // Delete design item from loading queue
        setQueue(prev => prev.filter(i => i.id !== 1))

    }, [])

    return (
        <DesignContext.Provider value={{
            design: design as designType,
            setDesign: setDesign as Dispatch<SetStateAction<designType>>
        }}>
            { queue.find(i => i.id === 1) ? null : children }
        </DesignContext.Provider>
    )
}

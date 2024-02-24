'use client'

import React, {
    ReactNode,
    Dispatch,
    SetStateAction,
    useState,
    useLayoutEffect
} from 'react';

// Shared
import { DesignContext, DesignsListProps, DesignType, designs } from '@/shared/utils/design-context';
import { useLoadingContext } from '@/shared/utils/loading-context';

// Provider for the current theme & design of the browser-home
export default function DesignProvider({ children }: { children: ReactNode }) {

    // Context data
    const { queue, setQueue } = useLoadingContext();

    // Setup default design
    const [design, setDesign] = useState<DesignsListProps | null>(null);

    // Save / Update design state in localStorage
    useLayoutEffect(() => {
        if (design && design.name && localStorage.getItem('design') !== design.name) {

            // Removes old theme from body
            document.body.classList.remove(localStorage.getItem('design') as string)

            // Add newest theme & Save to storage
            document.body.classList.add(design.name)
            localStorage.setItem('design', design.name)
        }

    }, [design])

    // Load design from localStorage on initial render
    useLayoutEffect(() => {
        const storedDesignName = localStorage.getItem('design') as DesignType;
        if (storedDesignName) {

            const storedDesign = designs.find(d => d.name === storedDesignName) as DesignsListProps
            setDesign(storedDesign); // If theme is stored, set it
            document.body.classList.add(storedDesignName) // Add theme to body

        }

        // Delete design item from loading queue
        setQueue(prev => prev.filter(i => i.id !== 1))

    }, [])

    return (
        <DesignContext.Provider value={{
            designs: designs,
            design: design as DesignsListProps,
            setDesign: setDesign as Dispatch<SetStateAction<DesignsListProps>>
        }}>
            {queue.find(i => i.id === 1) ? null : children}
        </DesignContext.Provider>
    )
}

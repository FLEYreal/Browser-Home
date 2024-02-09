'use client'

// Basics
import { ReactNode, useEffect, useState } from 'react';

// Shared
import { LoadingComponent } from '@/shared/ui/loading-fallback';
import { LoadingContext, queueItem } from '@/shared/utils/loading-context';

/** Global loading provider, it's shown until everything is fully loaded */
export default function LoadingProvider({ children }: { children: ReactNode }) {

    // List of items to load
    const [queue, setQueue] = useState<queueItem[]>([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    // Until no items in queue left, load
    return (
        <LoadingContext.Provider value={{ queue, setQueue }}>
            {children}
        </LoadingContext.Provider>
    )
}
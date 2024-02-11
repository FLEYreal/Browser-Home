'use client'

// Basics
import { ReactNode, useEffect, useRef, useState } from 'react';

// Shared
import { LoadingComponent } from '@/shared/ui/loading-fallback';
import { LoadingContext, queueItem } from '@/shared/utils/loading-context';

/** Global loading provider, it's shown until everything is fully loaded */
export default function LoadingProvider({ children }: { children: ReactNode }) {

    // Loading Component reference
    const loaderRef = useRef<HTMLElement | null>(null);

    // List of items to load
    const [queue, setQueue] = useState<queueItem[]>([
        {
            id: 1,
            name: 'design',
            message: 'Wait a second, we\'re implementing nice styles for you...'
        }
    ])

    // Is page wrapper tag is mounted (it also doesn't mean it's shown)
    const [display, setDisplay] = useState(false)

    useEffect(() => {

        setDisplay(true)

        // Disable scrolling to prevent scrolls when page's still loading
        document.body.style.overflowY = 'hidden';

    }, [])

    useEffect(() => {

        if (queue.length <= 0) {
            // Allow scrolling when everything's loaded
            document.body.style.overflowY = 'auto';

            // Slow dissappearance of loader
            if (loaderRef.current) {
                loaderRef.current.style.opacity = '0'
                setTimeout(() => {
                    loaderRef.current!.style.display = 'none'
                }, 300)
            }
        }

    }, [queue, loaderRef.current])

    // Until no items in queue left, load
    return (
        <LoadingContext.Provider value={{ queue, setQueue }}>
            <LoadingComponent ref={loaderRef} />
            {display && <section className='z-0'>{children}</section>}
        </LoadingContext.Provider>
    )
}
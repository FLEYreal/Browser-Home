'use client'

// Basics
import {
    ReactNode,
    Dispatch,
    SetStateAction,
    useState,
    useLayoutEffect,
    cloneElement as e,
    Children,
    ReactElement
} from 'react'

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

    const cloned = Children.map(
        children as ReactElement,
        (child: ReactElement) => {


            return e(child, {
                className: `${child.props.className || ""} ${design} bg-background`
            })
        }
    ) as ReactNode;

    console.log(cloned)

    return (
        <DesignContext.Provider value={{
            design: design as designType,
            setDesign: setDesign as Dispatch<SetStateAction<designType>>
        }}>
            {design && cloned}
        </DesignContext.Provider>
    )
}
'use client'

// Basics
import { ReactNode, useEffect, useState } from 'react';

// Shared
import { KeybindsContext, focusKeybindsType } from '@/shared/utils/keybinds-provider';


/** Global keybind provider, it contains keybinds functionality to every important feature */
export default function KeybindsProvider({ children }: { children: ReactNode }) {

    // States
    const [focusKeybinds, setFocusKeybinds] = useState<focusKeybindsType>('search');

    // Handlers
    const defaultKeybinds = (key: string, isAlt: boolean) => {}
    const noneKeybinds = (key: string, isAlt: boolean) => {}
    const searchKeybinds = (key: string, isAlt: boolean) => {}
    const shelvesKeybinds = (key: string, isAlt: boolean) => {}

    // Function to handle keybinds, defines focused area and only triggers keybinds for specific area
    const handleFocusKeybinds = (event: KeyboardEvent) => {

        switch (focusKeybinds) {
            case 'search': // Search Bar Area
                searchKeybinds(event.key, event.altKey)
                break;

            case 'shelves': // Shelves & Items Area
                shelvesKeybinds(event.key, event.altKey)
                break;

            default: // No Area defined, general keybinds
                noneKeybinds(event.key, event.altKey)
                break;
        }

        // Difference between "none" and default keybinds is that default keybinds work all the time but "none"
        // work only in the case that there's currently no are focus
        defaultKeybinds(event.key, event.altKey)

    }

    // Effects
    useEffect(() => {


        // Add keyboard listener
        document.addEventListener('keyup', handleFocusKeybinds)

        // Remove keyboard listener on unmount
        return () => {
            document.removeEventListener('keyup', handleFocusKeybinds)
        }

    }, [focusKeybinds])

    return (
        <KeybindsContext.Provider value={{
            focusKeybinds, setFocusKeybinds
        }}>
            {children}
        </KeybindsContext.Provider>
    )
}
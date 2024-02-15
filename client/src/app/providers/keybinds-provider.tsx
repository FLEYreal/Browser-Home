'use client'

// Basics
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

// Shadcn / Tailwind
import { useToast } from '@/shared/ui/use-toast';

// Features
import { handleSearch, toggleSameTab } from '@/widgets/search';

// Shared
import { KeybindsContext, focusKeybindsType } from '@/shared/utils/keybinds-provider';
import { useSearchContext } from '@/shared/utils/search-context';

/** Global keybind provider, it contains keybinds functionality to every important feature */
export default function KeybindsProvider({ children }: { children: ReactNode }) {

    // Context hooks
    const searchContext = useSearchContext()
    const { searchRef, query, sameTab } = searchContext;

    // Hooks
    const router = useRouter();
    const { toast } = useToast();

    // States
    const [focusKeybinds, setFocusKeybinds] = useState<focusKeybindsType>('none');

    // Handlers
    const defaultKeybinds = (key: string, isShift: boolean, isAlt: boolean) => {
        if (key === 'Escape') setFocusKeybinds('none')

    }
    const noneKeybinds = (key: string, isShift: boolean, isAlt: boolean) => {

        if ( // Focus Search
            key.toLowerCase() === 's' ||
            key.toLowerCase() === 'ы' &&
            (searchRef && searchRef.current)
        ) {
            setFocusKeybinds('search');
            (searchRef?.current as HTMLInputElement).focus()
        }

        else if ( // Focus Shelves
            key.toLowerCase() === 'f' ||
            key.toLowerCase() === 'а'
        ) {
            setFocusKeybinds('shelves')
        }

        else if ( // Focus Integrations
            key.toLowerCase() === 'i' || key.toLowerCase() === 'e' ||
            key.toLowerCase() === 'ш' || key.toLowerCase() === 'у'
        ) {
            setFocusKeybinds('integrations')
        }
    }

    const searchKeybinds = (key: string, isShift: boolean, isAlt: boolean) => {

        if (key === 'Enter') handleSearch(searchContext, router, query)

        else if (key === 'Escape' && searchRef!.current) {
            // Exit input focus
            document.activeElement === searchRef!.current ? (document.activeElement as HTMLInputElement).blur() : null
        }

        else if (
            isAlt &&
            (key.toLowerCase() === 'a' || key.toLowerCase() === 'ф')
        ) {
            const isSucceed = toggleSameTab(searchContext, toast)
            if (isSucceed) toast({ title: 'Toggled Same Tab: ' + sameTab })
        }
    }

    const integrationsKeybinds = (key: string, isShift: boolean, isAlt: boolean) => { }
    const shelvesKeybinds = (key: string, isShift: boolean, isAlt: boolean) => { }

    // Function to handle keybinds, defines focused area and only triggers keybinds for specific area
    const handleFocusKeybinds = (event: KeyboardEvent) => {

        switch (focusKeybinds) {
            case 'search': // Search Bar Area
                searchKeybinds(event.key, event.shiftKey, event.altKey)
                break;

            case 'shelves': // Shelves & Items Area
                shelvesKeybinds(event.key, event.shiftKey, event.altKey)
                break;

            case 'integrations': // Integrations Area
                integrationsKeybinds(event.key, event.shiftKey, event.altKey)
                break;

            default: // No Area defined, general keybinds
                noneKeybinds(event.key, event.shiftKey, event.altKey)
                break;
        }

        // Difference between "none" and default keybinds is that default keybinds work all the time but "none"
        // work only in the case that there's currently no are focus
        defaultKeybinds(event.key, event.shiftKey, event.altKey)

    }

    const handleClick = (event: MouseEvent) => {

        // If clicked on input, set focus to search
        if (event.target === searchRef?.current) setFocusKeybinds('search')

        // If clicked elsewhere, focuse to none
        else setFocusKeybinds('none')
    }

    // Effects
    useEffect(() => {

        console.log(focusKeybinds)

        document.addEventListener('keyup', handleFocusKeybinds) // Add keyboard listener
        document.addEventListener('click', handleClick) // Global Click event

        // Remove keyboard & click listeners on unmount
        return () => {
            document.removeEventListener('keyup', handleFocusKeybinds)
            document.removeEventListener('click', handleClick)
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
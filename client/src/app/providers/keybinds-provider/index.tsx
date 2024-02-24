'use client'

// Basics
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

// Shadcn / Tailwind
import { useToast } from '@/shared/ui/use-toast';

// Features
import { handleSearch, toggleSameTab } from '@/widgets/search';
import { CreateShelfDialogContent } from '@/features/shelf';

// Shared
import { KeybindsContext, focusKeybindsType } from '@/shared/utils/keybinds-provider';
import { useSearchContext } from '@/shared/utils/search-context';
import { Dialog } from '@/shared/ui/dialog';
import { CreateItemDialogContent } from '@/features/item';

// What modal to show
type globalDialog = 'new-shelf' | 'new-item';

/** Global keybind provider, it contains keybinds functionality to every important feature */
export default function KeybindsProvider({ children }: { children: ReactNode }) {

    // Context hooks
    const searchContext = useSearchContext()
    const { searchRef, query, sameTab } = searchContext;

    // Dialog's states
    const [dialog, setDialog] = useState<globalDialog>('new-item');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Hooks
    const router = useRouter();
    const { toast } = useToast();

    // States
    const [focusKeybinds, setFocusKeybinds] = useState<focusKeybindsType>('none');

    // Handlers
    const defaultKeybinds = (key: string, isShift: boolean) => {
        if (key === 'Escape') setFocusKeybinds('none')
    }

    const noneKeybinds = (key: string, isShift: boolean) => {

        if ( // Focus Search
            key.toLowerCase() === 'w' ||
            key.toLowerCase() === 'ц' &&
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
            key.toLowerCase() === 'e' || key.toLowerCase() === 'у'
        ) {
            setFocusKeybinds('integrations')
        }

        else if ( // Open new Shelf Modal
            isShift &&
            (key.toLowerCase() === 's' || key.toLowerCase() === 'ы')
        ) {
            setDialog('new-shelf')
            setIsOpen(true)
        }

        else if ( // Open new Item Modal
            isShift &&
            (key.toLowerCase() === 'i' || key.toLowerCase() === 'ш')
        ) {
            setDialog('new-item')
            setIsOpen(true)
        }

        else if ( // Toggle Same Tab
            isShift &&
            (key.toLowerCase() === 'a' || key.toLowerCase() === 'ф')
        ) {
            const isSucceed = toggleSameTab(searchContext, toast)
            if (isSucceed) toast({ title: 'Toggled Same Tab: ' + (sameTab ? 'ON' : 'OFF') })
        }
    }

    const searchKeybinds = (key: string, isShift: boolean) => {

        if (key === 'Enter') handleSearch(searchContext, router, query)

        else if (key === 'Escape' && searchRef!.current) {
            // Exit input focus
            document.activeElement === searchRef!.current ? (document.activeElement as HTMLInputElement).blur() : null
        }

    }

    const integrationsKeybinds = (key: string, isShift: boolean) => { }
    const shelvesKeybinds = (key: string, isShift: boolean) => { }

    // Function to handle keybinds, defines focused area and only triggers keybinds for specific area
    const handleFocusKeybinds = (event: KeyboardEvent) => {

        switch (focusKeybinds) {
            case 'search': // Search Bar Area
                searchKeybinds(event.key, event.shiftKey)
                break;

            case 'shelves': // Shelves & Items Area
                shelvesKeybinds(event.key, event.shiftKey)
                break;

            case 'integrations': // Integrations Area
                integrationsKeybinds(event.key, event.shiftKey)
                break;

            default: // No Area defined, general keybinds
                noneKeybinds(event.key, event.shiftKey)
                break;
        }

        // Difference between "none" and default keybinds is that default keybinds work all the time but "none"
        // work only in the case that there's currently no are focus
        defaultKeybinds(event.key, event.shiftKey)

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

    }, [focusKeybinds, searchContext])

    return (
        <KeybindsContext.Provider value={{
            focusKeybinds, setFocusKeybinds
        }}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {
                    dialog === 'new-item'
                        ? <CreateItemDialogContent />
                        : <CreateShelfDialogContent />
                }
            </Dialog>
            {children}
        </KeybindsContext.Provider>
    )
}
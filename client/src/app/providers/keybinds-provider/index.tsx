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
import { KeybindsContext, focusKeybindsType } from '@/shared/utils/keybinds-context';
import { useSearchContext } from '@/shared/utils/search-context';
import { Dialog } from '@/shared/ui/dialog';
import { CreateItemDialogContent } from '@/features/item';
import { useDesignContext } from '@/shared/utils/design-context';

// What modal to show
type globalDialog = 'new-shelf' | 'new-item';

/** Global keybind provider, it contains keybinds functionality to every important feature */
export default function KeybindsProvider({ children }: { children: ReactNode }) {

    // Context hooks
    const searchContext = useSearchContext()
    const { searchRef, query, sameTab, engines, setEngines } = searchContext;
    const { designs, design, setDesign } = useDesignContext();

    // Dialog's states
    const [dialog, setDialog] = useState<globalDialog>('new-item');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Hooks
    const router = useRouter();
    const { toast } = useToast();

    // States
    const [focusKeybinds, setFocusKeybinds] = useState<focusKeybindsType>('none');

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

        else if (isShift && key === 'ArrowRight') { // Set the next theme

            // Define next theme
            const nextDesign = designs.find(d => d.id === design.id + 1 && designs.length > design.id)

            // Set next theme if defined and the first one if not
            if (nextDesign) setDesign(nextDesign)
            else setDesign(designs[0])

        }

        else if (isShift && key === 'ArrowLeft') { // Set the previous theme

            // Define previous theme
            const previousDesign = designs.find(d => d.id === design.id - 1 && 0 < design.id)

            // Set next theme if defined and the last one if not
            if (previousDesign) setDesign(previousDesign)
            else setDesign(designs[designs.length - 1])

        }

        else if ( // Toggle Same Tab
            isShift &&
            (key.toLowerCase() === 'a' || key.toLowerCase() === 'ф')
        ) {
            const isSucceed = toggleSameTab(searchContext, toast)
            if (isSucceed) toast({ title: 'Toggled Same Tab: ' + (sameTab ? 'OFF' : 'ON') })
        }

        else if (
            key === '1' || key === '2' || key === '3' || key === '4' || key === '5'
        ) {
            if (!engines || typeof engines !== 'object') return;
            const engine = engines.find(e => e === Number(key) - 1)

            if (typeof engine === 'number') {
                setEngines(prev => prev!.filter(e => engine !== e))
            } else {
                setEngines(prev => {
                    const uniquePrev = new Set(prev);
                    uniquePrev.add(Number(key) - 1)
                    return Array.from(uniquePrev);
                })
            }

        }
    }

    const searchKeybinds = (key: string, isShift: boolean) => {

        if (key === 'Enter') handleSearch(searchContext, router, query)

        else if (key === 'Escape' && searchRef!.current) {
            // Exit input focus
            document.activeElement === searchRef!.current ? (document.activeElement as HTMLInputElement).blur() : null
        }

    }

    // Function to handle keybinds, defines focused area and only triggers keybinds for specific area
    const handleFocusKeybinds = (event: KeyboardEvent) => {

        if (focusKeybinds === 'disabled') return;

        switch (focusKeybinds) {
            case 'search': // Search Bar Area
                searchKeybinds(event.key, event.shiftKey)
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

        if (focusKeybinds === 'disabled') return;

        // If clicked on input, set focus to search
        if (event.target === searchRef?.current) setFocusKeybinds('search')

        // If clicked elsewhere, focuse to none
        else setFocusKeybinds('none')
    }

    // Effects
    useEffect(() => {

        document.addEventListener('keyup', handleFocusKeybinds) // Add keyboard listener
        document.addEventListener('click', handleClick) // Global Click event

        // Remove keyboard & click listeners on unmount
        return () => {
            document.removeEventListener('keyup', handleFocusKeybinds)
            document.removeEventListener('click', handleClick)
        }

    }, [focusKeybinds, searchContext, design])

    useEffect(() => {
        if (isOpen) setFocusKeybinds('disabled')
        else setFocusKeybinds('none')
    }, [isOpen])

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
'use client'

// Basics
import { useRef, useState, useEffect } from 'react'

// Shadcn / Tailwind
import { SearchIcon } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

// Insides
import { googleFormat } from './formtatter';
import { useSearchContext } from './provider'

export default function SearchBar() {

    // Hooks
    const { engines } = useSearchContext();
    const searchRef = useRef(null);

    // States
    const [query, setQuery] = useState<string>('');
    const [focused, setFocused] = useState(false);

    // Handlers
    const handleKeyup = (event: KeyboardEvent) => {

        if (event.key === 'Enter') {
            engines.forEach(engine => {

                if (engine === 'google') {

                    let link = `https://google.com/search?q=${googleFormat(query)}`

                    console.log(link)
                    window.open(link, '_blank')
                }

            })
        }

        if (event.key === 'Escape' && searchRef.current) {
            // Exit input focus
            document.activeElement === searchRef.current ? (document.activeElement as HTMLInputElement).blur() : null
        }

    }

    useEffect(() => {

        // When focused, add event listener to add key interaction to search bar
        if (searchRef && focused) {

            document.addEventListener('keyup', handleKeyup)

            // Remove on unmount
            return () => {
                document.removeEventListener('keyup', handleKeyup)
            }
        }

    }, [query, focused])

    // When focused, update focus state
    const handleFocus = () => {
        setFocused(true)
    }

    // When user focuses out, remove listener to perevent their multiplication / conflicts with other keyup listeners
    const handleFocusOut = () => {
        setFocused(false)
        document.removeEventListener('keyup', handleKeyup)
    }

    return (
        <div className='flex-1 relative'>
            <Input
                ref={searchRef}
                onFocus={handleFocus}
                onBlur={handleFocusOut}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search'
                className='p-6 text-xl font-medium leading-normal h-16 rounded-lg'
            />
            <Button variant="ghost" size="icon" className='bg-background absolute right-4 h-10 w-10 top-3'>
                <SearchIcon />
            </Button>
        </div>
    )
}
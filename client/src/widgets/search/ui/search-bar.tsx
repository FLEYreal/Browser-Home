'use client'

// Basics
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Shadcn / Tailwind
import { SearchIcon, X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/shared/ui/hover-card"

// Insides
import { bingFormat, googleFormat, yandexFormat, duckduckgoFormat } from '../utils/formtatter';
import { useSearchContext } from './provider'

export default function SearchBar() {

    // Hooks
    const { engines, sameTab } = useSearchContext();
    const router = useRouter();
    const searchRef = useRef(null);

    // States
    const [query, setQuery] = useState<string>('');
    const [focused, setFocused] = useState(false);

    // Utils
    const openEngine = (link: string) => {
        if (sameTab) router.push(link)
        else window.open(link, '_blank')
    }

    // Handlers
    const handleSearch = () => {
        if (engines) {
            engines.forEach(engine => {

                switch (engine) {
                    case 'google':
                        openEngine(googleFormat(query))
                        break;
                    case 'duckduckgo':
                        openEngine(duckduckgoFormat(query))
                        break;
                    case 'bing':
                        openEngine(bingFormat(query));
                        break;
                    case 'yandex':
                        openEngine(yandexFormat(query));
                        break;

                    default:
                        break;
                }

            })
        }
    }

    const handleKeyup = (event: KeyboardEvent) => {

        if (event.key === 'Enter') handleSearch()

        if (event.key === 'Escape' && searchRef.current) {
            // Exit input focus
            document.activeElement === searchRef.current ? (document.activeElement as HTMLInputElement).blur() : null
        }

    }

    // When focused, update focus state
    const handleFocus = () => {
        setFocused(true)
    }

    // When user focuses out, remove listener to perevent their multiplication / conflicts with other keyup listeners
    const handleFocusOut = () => {
        setFocused(false)
        document.removeEventListener('keyup', handleKeyup)
    }

    // Effects
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

    useEffect(() => {
        if (searchRef.current) {
            (searchRef.current as HTMLInputElement).focus()
        }
    }, [searchRef.current])

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
            {
                query.length >= 1 ? <>

                    {/* Search Icon */}
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button
                                onClick={handleSearch}
                                variant="ghost"
                                size="icon"
                                className='bg-background absolute right-4 h-10 w-10 top-3'
                            >
                                <SearchIcon />
                            </Button>
                        </HoverCardTrigger>

                        {/* Display button's name */}
                        <HoverCardContent className="flex justify-center items-center w-auto mt-4 px-6">
                            Search
                        </HoverCardContent>

                    </HoverCard>

                    {/* Clear Query Button */}
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button
                                onClick={() => setQuery('')}
                                variant="ghost"
                                size="icon"
                                className='bg-background absolute right-16 h-8 w-8 top-4'
                            >
                                <X size="24" />
                            </Button>
                        </HoverCardTrigger>

                        {/* Display button's name */}
                        <HoverCardContent className="flex justify-center items-center w-auto mt-4 px-6">
                            Clear Query
                        </HoverCardContent>

                    </HoverCard>
                </> : ''
            }
        </div>
    )
}
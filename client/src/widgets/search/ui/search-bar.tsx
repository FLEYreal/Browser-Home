'use client'

// Basics
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
import { handleSearch } from '../utils/handlers';
import { useSearchContext } from '@/shared/utils/search-context';

export default function SearchBar() {

    // Context Data
    const searchContext = useSearchContext();
    const { searchRef, query, setQuery } = searchContext;

    // Hooks
    const router = useRouter();

    return (
        <div className='flex-1 relative'>
            <Input
                ref={searchRef}
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
                                onClick={() => handleSearch(searchContext, router, query)}
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
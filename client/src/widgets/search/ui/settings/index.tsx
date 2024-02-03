// Shadcn / Tailwind
import { Settings } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
    Drawer,
    DrawerTrigger,
    DrawerHeader,
    DrawerContent,
    DrawerDescription,
    DrawerTitle
} from '@/shared/ui/drawer';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/shared/ui/hover-card"


// Insides
import SearchEngines from './search-engines';
import SameTab from './same-tab';

export default function SearchSettings() {

    return (
        <Drawer>

            <HoverCard>
                <HoverCardTrigger asChild>
                    <DrawerTrigger asChild>

                        <Button variant="ghost" size="icon">
                            <Settings size="28" />
                        </Button>

                    </DrawerTrigger>
                </HoverCardTrigger>

                {/* Display button's name */}
                <HoverCardContent className="flex justify-center items-center w-auto mt-4 px-6">
                    Search Settings
                </HoverCardContent>
            </HoverCard>

            <DrawerContent>
                <div className="mx-auto w-full max-w-xl">

                    {/* Header describing settings */}
                    <DrawerHeader>
                        <DrawerTitle className='text-xl'>
                            Search Settings
                        </DrawerTitle>
                        <DrawerDescription className='text-lg'>
                            Setup search the most comfortable way
                        </DrawerDescription>
                    </DrawerHeader>

                    {/* Divider to split settings and header */}
                    <hr className='bg-foreground mx-3 mt-4 mb-8' />

                    <div className='px-4 mt-4 mb-12'>
                        <SearchEngines />
                        <SameTab />
                    </div>

                </div>
            </DrawerContent>
        </Drawer>
    )
}
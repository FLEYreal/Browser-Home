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

// Insides
import SearchEngines from './search-engines';

export default function SearchSettings() {

    return (
        <Drawer>

            <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Settings size="28" />
                </Button>
            </DrawerTrigger>

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
                    </div>

                </div>
            </DrawerContent>
        </Drawer>
    )
}
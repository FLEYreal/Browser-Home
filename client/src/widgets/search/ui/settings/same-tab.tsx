'use client'

// Shadcn / Tailwind
import { Checkbox } from '@/shared/ui/checkbox';
import { useToast } from '@/shared/ui/use-toast';
import {
    DrawerDescription,
    DrawerTitle
} from '@/shared/ui/drawer';

// Shared
import { useSearchContext } from '@/shared/utils/search-context';

// Insides
import { toggleSameTab } from '../../utils/handlers';

export default function SameTab() {

    // Hooks
    const { toast } = useToast()

    // Context
    const searchContext = useSearchContext();
    const { sameTab } = searchContext;

    return (
        <section className='mt-12'>

            {/* Setting Header */}
            <DrawerTitle>Use Same Tab</DrawerTitle>
            <DrawerDescription className="my-2">
                By default, any time you search, results open in the new tabs but you can define to open them in the current tab (Works only if 1 search engine is ON)
            </DrawerDescription>

            {/* Setting's Options */}
            <div className='flex items-center gap-4 mt-6 w-1/2 text-primary'>
                <Checkbox
                    className='w-5 h-5'
                    checked={sameTab ? sameTab : false}
                    onClick={() => toggleSameTab(searchContext, toast)}
                />
                <p className='-mt-[1px]'>Use Same Tab</p>
            </div>
        </section>
    );
}
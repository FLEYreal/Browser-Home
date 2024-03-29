'use client'

// Shadcn / Tailwind
import { Button } from '@/shared/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/ui/popover";

// Shared
import ConverterContent from './converter';

// Conventer Integration
const ConverterPopover = () => (
    <Popover>
        <PopoverTrigger asChild>

            <Button variant="secondary">
                Conventer
            </Button>

        </PopoverTrigger>

        <PopoverContent className='flex flex-col gap-2 w-[340px]'>
            <ConverterContent />
        </PopoverContent>

    </Popover>
)

export default ConverterPopover;
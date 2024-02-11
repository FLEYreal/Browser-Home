// Shadcn / Tailwind
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { ChevronDown } from "lucide-react";

// Insides
import FastAccessContent from './fast-access-content';

// Completed fast-access options with button and content
const FastAccessPopover = () => (
    <Popover>

        {/* Button to open popover */}
        <PopoverTrigger asChild>
            <Button
                variant="ghost"
                size="icon"
                className='absolute left-4 h-8 w-8 top-[18px]'
            >
                <ChevronDown size="24" />
            </Button>
        </PopoverTrigger>

        {/* Content of the popover */}
        <PopoverContent align="start" className="-ml-4 w-[140px]">
            <FastAccessContent />
        </PopoverContent>
    </Popover>
)

export default FastAccessPopover;
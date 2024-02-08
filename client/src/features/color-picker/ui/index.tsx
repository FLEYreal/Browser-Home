// Shadcn / Tailwind
import { Button } from '@/shared/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/ui/popover";

// Insides
import ColorPicker from './color-picker';

// Color picker & Color Definer integration
const ColorPickerPopover = () => (
    <>

        {/* Modal of the widget */}
        <Popover>

            {/* Button to open Modal */}
            <PopoverTrigger asChild>
                <Button variant="secondary">Color Picker</Button>
            </PopoverTrigger>

            {/* Content of the Modal */}
            <PopoverContent className='w-[280px] flex flex-col items-center'>

                {/* Color Picker & Color Definer component */}
                <ColorPicker />

            </PopoverContent>
        </Popover>

    </>
);

export default ColorPickerPopover;
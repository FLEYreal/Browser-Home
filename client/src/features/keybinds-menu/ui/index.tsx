// Shadcn / Tailwind
import { Keyboard } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent
} from "@/shared/ui/dialog";

// Insides
import { KeybindsMenuContent } from '..';

// Menu with available keybinds
const KeybindsMenu = () => (
    <Dialog>

        {/* Button to open keybinds menu */}
        <DialogTrigger asChild>
            <Button variant='secondary' size='icon'><Keyboard size={22} /></Button>
        </DialogTrigger>

        {/* Content of keybinds menu */}
        <DialogContent className='w-[600px] max-w-[600px] text-lg'>
            <KeybindsMenuContent />
        </DialogContent>

    </Dialog>
)

export default KeybindsMenu;
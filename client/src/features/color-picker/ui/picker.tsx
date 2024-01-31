'use client'

// Basics
import { useState } from 'react';

// Shadcn / Tailwind
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useToast } from '@/shared/ui/use-toast';
import { Copy } from 'lucide-react';

// Libs
import { RgbaColor, RgbaColorPicker } from 'react-colorful';
import rgbHex from 'rgb-hex';

export default function ColorPicker() {

    // Hooks
    const { toast } = useToast()

    // States
    const [color, setColor] = useState<RgbaColor>({ r: 0, g: 0, b: 0, a: 0 });

    // Copy Color to Clipboard
    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value)
        toast({ title: 'Copied!' })
    }

    return (
        <>

            {/* Color Picker */}
            <RgbaColorPicker
                color={color}
                onChange={setColor}
                style={{ width: '240px', height: '240px' }}
            />

            {/* Inputs to get colors */}
            <div className='w-[240px] mt-4 flex flex-col gap-2'>

                {/* Rgba Color */}
                <div className='relative'>

                    <Input value={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`} readOnly />

                    {/* Copy Button */}
                    <Button
                        variant="ghost" size="icon"
                        className='absolute top-[10px] right-3 z-10 w-5 h-5 active:text-primary'
                        onClick={() => handleCopy(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`)}
                    >
                        <Copy size="20" />
                    </Button>

                </div>

                {/* Hex Color */}
                <div className='relative'>

                    <Input value={`#${rgbHex(color.r, color.g, color.b)}`} readOnly />

                    {/* Copy Button */}
                    <Button
                        variant="ghost" size="icon"
                        className='absolute top-[10px] right-3 z-10 w-5 h-5 active:text-primary'
                        onClick={() => handleCopy(`#${rgbHex(color.r, color.g, color.b)}`)}
                    >
                        <Copy size="20" />
                    </Button>

                </div>
            </div>
        </>
    );
}

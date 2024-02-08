'use client'

// Basics
import { Dispatch, SetStateAction, useState } from 'react';

// Shadcn / Tailwind
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useToast } from '@/shared/ui/use-toast';
import { Copy } from 'lucide-react';

// Libs
import { RgbaColor, RgbaColorPicker } from 'react-colorful';
import rgbHex from 'rgb-hex';

export interface ColorPickerInterface {
    color?: RgbaColor;
    setColor?: Dispatch<SetStateAction<RgbaColor>>;
}
export default function Picker({ color: customColor, setColor: setCustomColor }: ColorPickerInterface) {

    // Hooks
    const { toast } = useToast()

    // States
    const [color, setColor] = useState<RgbaColor>({ r: 0, g: 0, b: 0, a: 0 });

    // Copy Color to Clipboard
    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value)
        toast({ title: 'Copied!' })
    }

    // Use customColor & setCustomColor if defined, otherwise use color & setColor
    const currentColor = customColor && setCustomColor ? customColor : color;
    const setCurrentColor = customColor && setCustomColor ? setCustomColor : setColor;

    return (
        <>

            {/* Color Picker */}
            <RgbaColorPicker
                color={currentColor}
                onChange={(newColor) => setCurrentColor(newColor)}
                style={{ width: '240px', height: '240px' }}
            />

            {/* Inputs to get colors */}
            <div className='w-[240px] mt-4 flex flex-col gap-2'>

                {/* Rgba Color */}
                <div className='relative'>

                    <Input value={`rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${currentColor.a})`} readOnly />

                    {/* Copy Button */}
                    <Button
                        variant="ghost" size="icon"
                        className='absolute top-[10px] right-3 z-10 w-5 h-5 active:text-primary'
                        onClick={() => handleCopy(`rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${currentColor.a})`)}
                    >
                        <Copy size="20" />
                    </Button>

                </div>

                {/* Hex Color */}
                <div className='relative'>

                    <Input value={`#${rgbHex(currentColor.r, currentColor.g, currentColor.b)}`} readOnly />

                    {/* Copy Button */}
                    <Button
                        variant="ghost" size="icon"
                        className='absolute top-[10px] right-3 z-10 w-5 h-5 active:text-primary'
                        onClick={() => handleCopy(`#${rgbHex(currentColor.r, currentColor.g, currentColor.b)}`)}
                    >
                        <Copy size="20" />
                    </Button>

                </div>
            </div>
        </>
    );
}

'use client'

// Basics
import { useState } from "react"

// Shadcn / Tailwind
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { useToast } from "@/shared/ui/use-toast"

// Libs
import hexRgb from 'hex-rgb'

export default function Definer() {

    // Hooks
    const { toast } = useToast();

    // States
    const [value, setValue] = useState('')

    // Utils
    const formatHex = (value: string) => {

        // Wrap into TRY/CATCH to aboid hexRgb's raising errors
        try {

            const result = hexRgb(value, { format: 'array' });
            if (result) return `rgba(${result[0]}, ${result[1]}, ${result[2]}, 1)`
            else return '';

        } catch (e) {
            return ''
        }
    }

    // Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleCopyRgba = () => {

        // Copy a RGBA version of hex color
        navigator.clipboard.writeText(formatHex(value))
        toast({ title: 'Copied!' })

    }

    return (
        <div>
            <div
                style={{ backgroundColor: `${value}` }}
                className={`
                    rounded-lg h-24 mb-3 border shadow-2xl
                    transition-colors duration-100 ease-in-out
                    flex items-center justify-center
                `}>
            </div>
            <Input placeholder="Insert Hex Color" value={value} onChange={handleChange} />

            {/* Button to copy */}
            <Button
                variant="secondary"
                className="mt-2 w-[240px] active:bg-primary active:text-btn transition-all duration-75"
                onClick={handleCopyRgba}
            >
                {formatHex(value)}
            </Button>
        </div>
    )
}
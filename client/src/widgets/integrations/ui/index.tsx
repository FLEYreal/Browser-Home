'use client'

// Basics
import { useState } from "react";

// Features
import { ColorPicker } from "@/features/color-picker";

// Shadcn / Tailwind
import { ChevronUp } from 'lucide-react';
import { Button } from "@/shared/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/shared/ui/collapsible";

export default function Intefrations() {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <Collapsible>
            <CollapsibleTrigger onClick={() => setIsOpen(prev => !prev)} className="text-xl mt-7 mb-5 flex flex-row items-center gap-2">
                <ChevronUp className="transition-all duration-200 ease-in-out mt-1" style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }} />
                <p>Integrations</p>
            </CollapsibleTrigger>
            <CollapsibleContent className="text-lg flex flex-row gap-3">
                <Button>Social AI</Button>
                <ColorPicker />
            </CollapsibleContent>
        </Collapsible>
    )
}
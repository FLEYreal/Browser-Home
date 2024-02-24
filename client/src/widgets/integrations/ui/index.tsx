'use client'

// Basics
import { useState } from "react";

// Features
import { ColorPickerPopover } from "@/features/color-picker";
import { ConverterPopover } from "@/features/converter";

// Shadcn / Tailwind
import { ChevronUp } from 'lucide-react';
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/use-toast";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/shared/ui/collapsible";

export default function Intefrations() {

    // Hooks
    const { toast } = useToast();

    // States
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger onClick={() => setIsOpen(prev => !prev)} className="text-xl mt-7 mb-5 flex flex-row items-center gap-2">
                <ChevronUp className="transition-all duration-200 ease-in-out mt-1" style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }} />
                <p>Integrations</p>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-row gap-3">

                <Button onClick={() => {
                    toast({
                        title: 'Not Supported Yet',
                        description: 'Social AI is not completed yet so this button doesn\'t work',
                        variant: 'destructive'
                    })
                }}>Social AI</Button>

                <ColorPickerPopover />
                <ConverterPopover />

            </CollapsibleContent>
        </Collapsible>
    )
}
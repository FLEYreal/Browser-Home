'use client'

// Basics
import { useMemo } from 'react';

// Shadcn / Tailwind
import { Checkbox } from '@/shared/ui/checkbox';
import {
    DrawerDescription,
    DrawerTitle
} from '@/shared/ui/drawer';

// Insides
import { useSearchContext, EngineState } from '@/shared/utils/search-context';
import { useToast } from '@/shared/ui/use-toast';

// Interfaces & Types
export interface searchEnginesProps {
    name: EngineState;
    label: string;
}

export default function SearchEngines() {

    // Hooks
    const { toast } = useToast();

    // Context
    const { engines, setEngines, sameTab } = useSearchContext();

    // List of available engines to set
    const searchEnginesList: searchEnginesProps[] = useMemo(
        () => [
            { name: 'google', label: 'Google' },
            { name: 'yandex', label: 'Yandex' },
            { name: 'bing', label: 'Bing' },
            { name: 'duckduckgo', label: 'DuckDuckGo' },
            { name: 'youtube', label: 'YouTube' }
        ],
        []
    );

    const handleCheckboxChange = (engineName: EngineState, checked: boolean) => {

        if (engines) {

            if (sameTab && engines.length >= 1 && checked) {
                toast({
                    title: 'Turn off "Use Same Tab"',
                    description: 'You cannot open more than 1 search engine in the same tab!',
                    variant: 'destructive'
                })
            } else {

                // Toggle the state of the engine in the list
                const updatedEngines = engines.includes(engineName)
                    ? engines.filter((name) => name !== engineName)
                    : [...engines, engineName];

                // Update the context with the new list of engines
                setEngines(updatedEngines);

            }

        }
    };

    return (
        <section>
            {/* Setting Header */}
            <DrawerTitle>Search Engines</DrawerTitle>
            <DrawerDescription className="my-2">
                By this setting, you define what search engines will be used.
            </DrawerDescription>

            {/* Setting's Options */}
            <div className='grid grid-cols-2 gap-2 mt-6 w-1/2'>
                {searchEnginesList.map((engine) => {

                    if (engines) {

                        return (
                            <div
                                key={engine.name}
                                className='flex gap-4 items-center justify-start text-primary'
                            >
                                <Checkbox
                                    className='w-5 h-5'
                                    checked={engines.includes(engine.name)}
                                    onClick={() => handleCheckboxChange(engine.name, !engines.includes(engine.name))}
                                />
                                <p>{engine.label}</p>
                            </div>
                        )
                    }

                })}
            </div>
        </section>
    );
}
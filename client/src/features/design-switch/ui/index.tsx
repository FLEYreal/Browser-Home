'use client'

// Basics
import { useEffect, useRef } from "react";

// Shadcn / Tailwind
import { Palette } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription
} from "@/shared/ui/drawer";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/shared/ui/hover-card"

// Shared
import { useDesignContext, designType, designs } from "@/shared/utils/design-context";

// Styles
import s from './style.module.scss'

// Drawer with options to change theme
function DesignSwitch() {

    // Context Values
    const { design, setDesign } = useDesignContext();

    // Reference to theme toggle container
    const themeToggleRef = useRef<HTMLDivElement>(null);

    // Handlers
    const handleDesignSwitch = (newDesign: designType) => {
        setDesign(newDesign); // Set new chosen design, triggered when theme's button clicked
    }

    // Effects
    useEffect(() => {
        // Each time new design's chosen, remove class from buttons
        // that aren't current theme's buttons.

        if (themeToggleRef.current) {

            // Get all buttons
            const btnList = themeToggleRef.current.children

            // Iterate over each theme button to add & remove current theme's class
            Array.from(btnList).forEach((item) => {

                // Remove current theme's class from all buttons that aren't current theme's buttons
                if (item.getAttribute('id') !== `toggle-${design}-theme-btn`) {
                    item.classList.remove(s['current-btn'])
                }

                // Add current theme's class to current theme's button
                else item.classList.add(s['current-btn'])

            })
        }

    }, [design, themeToggleRef])

    return (

        // Drawer container to choose theme
        <Drawer>

            {/* Container for component triggering drawer's open */}
            <DrawerTrigger asChild>
                <Button size='icon'><Palette size={22} /></Button>
            </DrawerTrigger>

            {/* Container for drawer's content */}
            <DrawerContent>

                {/* Drawer's Wrapper */}
                <div className="mx-auto w-full max-w-xl">

                    {/* Header with title / subtitle */}
                    <DrawerHeader>
                        <DrawerTitle>Choose Theme</DrawerTitle>
                        <DrawerDescription>Customize Browser-Home the way you want!</DrawerDescription>
                    </DrawerHeader>

                    {/* Container with items to choose preferable design */}
                    <div ref={themeToggleRef} className="flex mb-8 gap-4 px-5 py-3">
                        {
                            // Make button for each design
                            designs.map((item, key) => {

                                // Class for chosen theme / No class
                                const current = design === item.name ? s['current-btn'] : ''

                                return (

                                    // Add hover card to each theme option to display its name
                                    <HoverCard key={key}>
                                        <HoverCardTrigger asChild>

                                            {/* Button to trigger new theme */}
                                            <Button
                                                id={`toggle-${item.name}-theme-btn`}
                                                onClick={() => handleDesignSwitch(item.name)}
                                                className={`${current} ${s[`theme-btn-${item.name}`]} ${s['theme-btn']}`}
                                            />

                                        </HoverCardTrigger>

                                        {/* Display popover with theme's name */}
                                        <HoverCardContent className="flex justify-center items-center w-auto mb-3 px-6">
                                            {item.emoji || ''} {item.name.charAt(0).toUpperCase() + item.name.slice(1)} Theme
                                        </HoverCardContent>

                                    </HoverCard>
                                )
                            })
                        }
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )

}

export default DesignSwitch;
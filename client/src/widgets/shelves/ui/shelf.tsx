'use client'

// Basics
import { HTMLAttributes } from "react";

// Shadcn / Tailwind
import { SettingsIcon, PlusIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";

// Features
import { Item, ItemProps } from "@/features/item";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/ui/hover-card";

// Interfaces
export interface ShelfDataProps {
    // Properties of the Shelf
    title: string;
    description: string;
    color: string;
    created_at: string;

    // Provide list of items of the Shelf
    items: ItemProps[];
}

export interface ShelvesProps extends HTMLAttributes<HTMLDivElement> {
    data: ShelfDataProps
}

export default function ({ data, ...props }: ShelvesProps) {

    // Shelf's content data
    const { title, description, color, created_at, items } = data;

    return (
        <div
            {...props}
            className={`
                ${props?.className}
                mb-10
            `}
        >
            {/* Shelf's header */}
            <header>

                {/* Title & Divider Section */}
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <section className="
                            flex flex-row justify-start items-center 
                            gap-2 cursor-default
                        ">

                            {/* Title */}
                            <div style={{ color: color }} className='text-lg'>
                                {title}
                            </div>

                            {/* Divider */}
                            <hr style={{ borderColor: color }} className='w-[2px] flex-1' />

                            {/* Options */}
                            <div className="
                                flex flex-row justify-start items-center gap-1
                            ">
                                <Button className="w-8 h-8" size="icon" variant="ghost">
                                    <SettingsIcon size="23" style={{ color: color }} />
                                </Button>
                                <Button className="w-8 h-8" size="icon" variant="ghost">
                                    <PlusIcon size="23" style={{ color: color }} />
                                </Button>
                            </div>

                        </section>
                    </HoverCardTrigger>
                    <HoverCardContent className="text-center text-lg w-auto px-8">
                        <div className="text-sm">
                            Shelf Creation TIme
                        </div>
                        <div>
                            {created_at.split("T")[0]}
                        </div>
                    </HoverCardContent>
                </HoverCard>

                {/* Description Section */}
                <section style={{ color: color }} className="text-sm opacity-60">
                    {description}
                </section>

            </header>

            {/* Shelf's content (Contains all items) */}
            <section
                className="mt-5 flex flex-row flex-wrap gap-[19px]"
            >
                {
                    items.map((item, key) => {

                        return (
                            <Item
                                key={key}
                                color={color}
                                title={item.title}
                                link={item.link}
                                description={item.description || undefined}
                                icon={item.icon || undefined}
                            />
                        )
                    })
                }
            </section>
        </div>
    )
}
'use client'

// Basics
import { HTMLAttributes } from "react";

// Shadcn / Tailwind
import { SettingsIcon, PlusIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";

// Features
import { Item, ItemProps } from "@/features/item";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/ui/hover-card";
import { CreateItemDialog } from "@/features/new-item";

// Interfaces
export interface ShelfDataProps {
    // Properties of the Shelf
    shelf_id: number;
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
    const { shelf_id, title, description, color, created_at, items } = data;

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
                        <section className="flex flex-row justify-start items-center gap-2">

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
                                {/* Settings */}
                                <Button className="w-8 h-8" size="icon" variant="ghost">
                                    <SettingsIcon size="23" style={{ color: color }} />
                                </Button>

                                {/* Create Item for the Shelf */}
                                <CreateItemDialog defaultShelf={shelf_id}>
                                    <Button className="w-8 h-8" size="icon" variant="ghost">
                                        <PlusIcon size="23" style={{ color: color }} />
                                    </Button>
                                </CreateItemDialog>
                            </div>

                        </section>
                    </HoverCardTrigger>
                    {/* <HoverCardContent className="w-auto px-8 flex flex-col gap-3">
                        <div>
                            <div className="text-xs">
                                Unique ID
                            </div>
                            <div className="text-sm">
                                {shelf_id}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs">
                                Shelf Creation TIme
                            </div>
                            <div className="text-sm">
                                {created_at.split("T")[0]}
                            </div>
                        </div>
                    </HoverCardContent> */}
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
                                item_id={item.item_id}
                                title={item.title}
                                link={item.link}
                                description={item.description || undefined}
                            />
                        )
                    })
                }
            </section>
        </div>
    )
}
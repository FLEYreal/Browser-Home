'use client'

// Basics
import { HTMLAttributes, useState } from "react";

// Shadcn / Tailwind
import { SettingsIcon, Pencil, PlusIcon, Trash, PlusCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuSeparator,
    ContextMenuRadioGroup,
    ContextMenuRadioItem
} from "@/shared/ui/context-menu"
import { Dialog, DialogTrigger } from "@/shared/ui/dialog";

// Features
import { Item, ItemProps, ItemSize } from "@/features/item";
import { CreateItemDialog, CreateItemDialogContent } from "@/features/new-item";
import { sizes } from "@/features/item/ui/sizes";

// Insides
import Details from "./details";

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

    // States
    const [size, setSize] = useState<ItemSize>('medium')

    return (
        <Dialog>

            {/* Context menu wrapper */}
            <ContextMenu>

                {/* Right click on shelf to open settings */}
                <ContextMenuTrigger asChild>

                    {/* Shelf's wrapper */}
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
                                    {/* Create Item for the Shelf */}
                                    <CreateItemDialog defaultShelf={shelf_id}>
                                        <Button className="w-8 h-8" size="icon" variant="ghost">
                                            <PlusIcon size="23" style={{ color: color }} />
                                        </Button>
                                    </CreateItemDialog>
                                </div>

                            </section>

                            {/* Description Section */}
                            <section style={{ color: color }} className="text-sm opacity-60">
                                {description}
                            </section>

                        </header>

                        {/* Shelf's content (Contains all items) */}
                        <section
                            style={{ gap: sizes[size].gap }}
                            className="mt-5 flex flex-row flex-wrap"
                        >
                            {
                                items.map((item, key) => {

                                    return (
                                        <Item
                                            size={size}
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

                </ContextMenuTrigger>

                {/* Context menu (settings) itself */}
                <ContextMenuContent className="w-[180px]">
                    
                    {/* Setings's header */}
                    <h2 className="
                        text-white text-[15px] ml-2 my-4
                        flex flex-row items-center gap-3
                    ">
                        <SettingsIcon size={18} />
                        Shelf Settings
                    </h2>

                    <ContextMenuSeparator />

                    {/* Edit shelf option */}
                    <ContextMenuItem className="flex flex-row gap-2 items-center">
                        <Pencil size={16} />
                        Edit Shelf
                    </ContextMenuItem>

                    {/* Create new item inside shelf option */}
                    <DialogTrigger asChild>
                        <ContextMenuItem className="flex flex-row gap-2 items-center">
                            <PlusCircle size={16} />
                            Create Item
                        </ContextMenuItem>
                    </DialogTrigger>

                    {/* Option to see additional information about shelf */}
                    <Details details={{
                        shelf_id: shelf_id,
                        created_at: created_at,
                        item_amount: items.length
                    }} />

                    <ContextMenuSeparator />

                    {/* 
                        Define item's size inside shelf 
                    
                        Medium: Fits 8 Items
                        Small: Fits 10 Items
                        Smaller: FIts 12 Items
                    
                    */}
                    <ContextMenuRadioGroup value={size}>

                        <ContextMenuRadioItem value="medium" onClick={() => setSize('medium')}>Medium Size</ContextMenuRadioItem>
                        <ContextMenuRadioItem value="small" onClick={() => setSize('small')}>Small Size</ContextMenuRadioItem>
                        <ContextMenuRadioItem value="smaller" onClick={() => setSize('smaller')}>Smaller Size</ContextMenuRadioItem>

                    </ContextMenuRadioGroup>

                    <ContextMenuSeparator />

                    {/* Dangerous zone, shelf's deletion */}
                    <ContextMenuItem className="text-red-500 flex flex-row gap-2 items-center">
                        <Trash size={16} />
                        Delete Shelf
                    </ContextMenuItem>

                </ContextMenuContent>

            </ContextMenu>

            {/* Item Creation Modal's content */}
            <CreateItemDialogContent defaultShelf={shelf_id} />
        </Dialog>
    )
}
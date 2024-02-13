'use client'

// Shadcn / Tailwind
import { PlusIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";

// Features
import { CreateItemDialog } from "@/features/item";

// Insides
import { useShelfContext } from "../provider";

// Header of the shelf with title, description and divider
export default function ShelfHeader() {

    // Context Data
    const { data } = useShelfContext()
    const { color, title, shelf_id, description } = data

    return (
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
                <div className=" flex flex-row justify-start items-center gap-1">

                    {/* Create Item for the Shelf */}
                    <CreateItemDialog defaultShelf={shelf_id}>

                        <Button className="w-8 h-8" size="icon" variant="ghost">
                            <PlusIcon size="23" style={{ color: color }} />
                        </Button>

                    </CreateItemDialog>

                </div>

            </section>

            {/* Description Section */}
            <section style={{ color: color }} className="text-sm opacity-60 w-[896px] break-words whitespace-normal">
                {description}
            </section>

        </header>
    )
}
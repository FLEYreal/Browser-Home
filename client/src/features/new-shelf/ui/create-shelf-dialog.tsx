'use client'

// Basics
import { ReactNode, useState } from "react";

// Shadcn / Tailwind
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/shared/ui/dialog";
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@/shared/ui/popover";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";

// Shared
import Picker from "@/shared/ui/picker";

// Libs
import { RgbaColor } from "react-colorful";
import rgbHex from 'rgb-hex';

export default function CreateShelfDialog({ children }: { children: ReactNode }) {

    // Color of the shelf
    const [color, setColor] = useState<RgbaColor>({ r: 160, g: 160, b: 160, a: 1 });

    // Title & Description of the shelf
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Dialog>

            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="text-sm w-[400px]">
                <h2 className="text-center text-lg py-3">Create Shelf</h2>
                <Input placeholder="Title" className="text-sm" />
                <Textarea
                    placeholder="Description"
                    className="resize-none text-sm h-24"
                />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            style={{
                                color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                                borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
                            }}
                        >
                            {rgbHex(`rgba(${color.r}, ${color.g}, ${color.b}, 1)`)}
                        </Button>

                    </PopoverTrigger>
                    <PopoverContent>
                        <Picker color={color} setColor={setColor} />
                    </PopoverContent>
                </Popover>
                <Button>Create</Button>
            </DialogContent>

        </Dialog>
    )

}
'use client'

// Basics
import { ReactNode, useEffect, useState } from "react";

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
import { useCreateShelves, createShelvesKey } from "@/shared/api/shelf-api";
import { BackendResponseType } from "@/shared/config/types";

// Libs
import { RgbaColor } from "react-colorful";
import rgbHex from 'rgb-hex';
import { useToast } from "@/shared/ui/use-toast";
import { AxiosError } from "axios";
import { DialogClose } from "@radix-ui/react-dialog";

export default function CreateShelfDialog({ children }: { children: ReactNode }) {

    // Create Shelf Query
    const { mutate, isError, isSuccess, error } = useCreateShelves();

    // Hooks
    const { toast } = useToast();

    // Color of the shelf
    const [color, setColor] = useState<RgbaColor>({ r: 160, g: 160, b: 160, a: 1 });

    // Title & Description of the shelf
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // If error on creating shelf
    useEffect(() => {

        if (isError) {
            toast({
                title: (error as AxiosError<BackendResponseType>).response?.data.title,
                description: (error as AxiosError<BackendResponseType>).response?.data.description,
                variant: 'destructive'
            })
        }

        else if (isSuccess) {
            toast({
                title: 'Successfully created new Shelf!'
            })
        }

    }, [isError, isSuccess])

    return (
        <Dialog>

            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="text-sm w-[400px]">
                <h2 className="text-center text-lg py-3">Create Shelf</h2>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="text-sm"
                />
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                {/* <DialogClose>

                </DialogClose> */}
                <Button onClick={() => mutate([{
                    title: title,
                    description: description,
                    color: `#${rgbHex(color.r, color.g, color.b)}`
                }])}>
                    Create
                </Button>
            </DialogContent>

        </Dialog>
    )

}
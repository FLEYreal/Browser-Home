'use client'

// Basics
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

// Shadcn / Tailwind
import { DialogContent, DialogClose } from "@/shared/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/use-toast";

// Shared
import Picker from "@/shared/ui/picker";
import { createShelvesKey, updateShelvesBody, useUpdateShelves } from "@/shared/api/shelf-api";
import { BackendResponseType } from "@/shared/config/types";

// Libs
import { RgbaColor } from "react-colorful";
import rgbHex from 'rgb-hex';
import hexRgb from "hex-rgb";

// Content for common modal window for shelf creation
export default function EditShelfDialogContent({ data = { shelf_id: -1 } }: { data: updateShelvesBody[number] }) {

    // Create Shelf Query
    const { mutate, isError, isSuccess, error } = useUpdateShelves();

    // Hooks
    const { toast } = useToast();

    // New Color of the shelf
    const [color, setColor] = useState<RgbaColor>({
        r: hexRgb(data.color || '#ffffff').red,
        g: hexRgb(data.color || '#ffffff').green,
        b: hexRgb(data.color || '#ffffff').blue,
        a: 1
    });

    // New Title & Description of the shelf
    const [title, setTitle] = useState(data.title || '');
    const [description, setDescription] = useState(data.description || '');

    // If error on creating shelf
    useEffect(() => {

        if (isError) {
            toast({
                title: (error as AxiosError<BackendResponseType>).response?.data.title,
                description: `[${(createShelvesKey[0] as string).toUpperCase()}] ${(error as AxiosError<BackendResponseType>).response?.data.description}`,
                variant: 'destructive'
            })
        }

        else if (isSuccess) {
            toast({
                title: 'Successfully updated new Shelf!'
            })
        }

    }, [isError, isSuccess])

    return (

        <DialogContent className="text-sm w-[400px]">
            <h2 className="text-center text-lg py-3">Update Shelf #{data.shelf_id}</h2>
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
            <DialogClose asChild>

                <Button onClick={() => mutate([{
                    shelf_id: data.shelf_id,
                    title: title.length >= 1 ? title : undefined,
                    description: description.length >= 1 ? description : undefined,
                    color: data.color ? '#'+rgbHex(`rgb(${color.r} ${color.g} ${color.b})`) : undefined
                }])}>
                    Create
                </Button>

            </DialogClose>
        </DialogContent>
    )

}
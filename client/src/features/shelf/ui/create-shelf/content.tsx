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
import { useCreateShelves, createShelvesKey } from "@/shared/api/shelf-api";
import { BackendResponseType } from "@/shared/config/types";
import { CurrentLength } from "@/shared/ui/current-length";

// Libs
import { RgbaColor } from "react-colorful";
import rgbHex from 'rgb-hex';

// Content for common modal window for shelf creation
export default function CreateShelfDialogContent() {

    // Create Shelf Query
    const { mutate, isError, isSuccess, error } = useCreateShelves();

    // Hooks
    const { toast } = useToast();

    // Color of the shelf
    const [color, setColor] = useState<RgbaColor>({ r: 160, g: 160, b: 160, a: 1 });

    // Title & Description of the shelf
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Handlers
    const onShelfCreate = () => {
        if (title.length > 32) toast({ title: 'Title length exceeds 32 symbols!', variant: 'destructive' })
        else if (description.length > 256) toast({ title: 'Description length exceeds 256 symbols!', variant: 'destructive' })
        else mutate([{
            title: title,
            description: description,
            color: `#${rgbHex(color.r, color.g, color.b)}`
        }])
    }

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
                title: 'Successfully created new Shelf!'
            })

            // Reset values on successful creation
            setTitle('')
            setDescription('')
            setColor({ r: 160, g: 160, b: 160, a: 1 })

        }

    }, [isError, isSuccess])

    return (

        <DialogContent className="text-sm w-[400px]">

            {/* Title of the dialog */}
            <h2 className="text-center text-lg py-3">Create Shelf</h2>

            {/* Title of the new shelf */}
            <div className="relative">
                
                {/* Type title for the new shelf */}
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className={title.length > 32 ? "text-sm border border-red-500" : "text-sm"}
                />
                
                {/* Show limit of the title's length */}
                <CurrentLength
                    current={title.length}
                    limit={32}
                />
            </div>

            {/* Description of the new shelf */}
            <div className="relative">

                {/* Type description for the new shelf */}
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className={description.length > 256 ?
                        "text-sm resize-none h-24 border border-red-500" :
                        "text-sm resize-none h-24"
                    }
                />

                {/* Show limit of the description's length */}
                <CurrentLength
                    current={description.length}
                    limit={256}
                />
            </div>

            {/* Color picker to choose shelf's color */}
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

            {/* Button to create new shelf */}
            <DialogClose asChild>

                <Button onClick={onShelfCreate}>
                    Create
                </Button>

            </DialogClose>
        </DialogContent>
    )

}
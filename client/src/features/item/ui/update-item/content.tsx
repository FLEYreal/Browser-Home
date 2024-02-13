'use client'

// Basics
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

// Shadcn / Tailwind
import {
    DialogContent,
    DialogClose
} from "@/shared/ui/dialog";
import {
    Select,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem
} from "@/shared/ui/select";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/use-toast";

// Shared
import { getShelvesKey } from "@/shared/api/shelf-api";
import { BackendResponseType } from "@/shared/config/types";
import { updateItemBody, useUpdateIcon, useUpdateItems } from "@/shared/api/item-api";

export default function UpdateItemDialogContent({
    data = { item_id: -1 }
}: {
    data: updateItemBody[number]
}) {

    // Toast
    const { toast } = useToast();

    // RQ Context
    const queryClient = useQueryClient();

    // Get Shelves List from Cache
    const shelvesList:
        AxiosResponse<BackendResponseType, any> | null =
        queryClient.getQueriesData<AxiosResponse<BackendResponseType, any>>({ queryKey: getShelvesKey })[0][1] || null;

    // Item Data States
    const [title, setTitle] = useState(data.title || '');
    const [link, setLink] = useState(data.link || '');
    const [description, setDescription] = useState(data.description || '');
    const [icon, setIcon] = useState<File | null>(null); // Icon to set for the item
    const [shelf, setShelf] = useState<number>(data.shelf_fk || -1); // Shelf's id the item belongs to

    // Mutation hooks
    const { mutate: createItem, ...itemProps } = useUpdateItems();
    const { mutate: updateIcon, ...iconProps } = useUpdateIcon();

    // Handlers
    const onItemUpdate = () => {

        // First, create item
        createItem([{
            item_id: data.item_id,
            shelf_fk: shelf,
            link: link.length >= 1 ? link : undefined,
            title: title.length >= 1 ? title : undefined,
            description: description.length >= 1 ? description : undefined
        }])

        // Then, when item is updated, upload new icon if it's provided
        if (icon) updateIcon({
            item_id: data.item_id,
            icon: icon
        });

    }

    // Effects
    useEffect(() => {

        // Define whether is there and error and if there is, get data of it
        const error = ((itemProps.error || iconProps.error) as AxiosError<BackendResponseType, any>) || null;

        // Display notification of an error if there is
        if (error) toast({
            title: error.response!.data.title,
            description: error.response!.data.description,
            variant: 'destructive'
        })

        // Show notification of succeffully updated item
        if (itemProps.isSuccess && (icon ? iconProps.isSuccess : true)) {
            toast({ title: 'Successfully updated item!' })
        }

    }, [
        itemProps.isError, itemProps.isSuccess,
        iconProps.isError, iconProps.isSuccess,
        icon
    ])

    return (
        <DialogContent className="text-sm w-[400px]">

            <h2 className="text-center text-lg py-3">Update Item #{data.item_id}</h2>

            {/* Title for Item */}
            <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Title"
                className="text-sm"
            />

            {/* Link of the item */}
            <Input
                value={link}
                onChange={(event) => setLink(event.target.value)}
                placeholder="Link"
                className="text-sm"
            />

            {/* Description for Item */}
            <Textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Description"
                className="resize-none text-sm h-24"
            />

            {/* Select shelf the item will belong to */}
            {
                shelvesList && shelvesList.data && shelvesList.data.payload ? // Shelf list has to be defined
                    <Select

                        // Define default value, it's whether first item in the list or provided from outside
                        defaultValue={String(
                            shelf > 0 ?
                                shelvesList.data.payload.find(s => s.shelf_id === shelf).shelf_id : // Provided shelf
                                shelvesList.data.payload[0].shelf_id // First item in the list
                        )}

                        onValueChange={(value) => setShelf(Number(value))}
                    >

                        {/* Trigger Input for select menu */}
                        <SelectTrigger
                            style={{

                                // Set the same text & border's color for the input as shelf's color
                                color: shelf > 0 ?
                                    shelvesList.data.payload.find(s => s.shelf_id === shelf).color :
                                    shelvesList.data.payload[0].color,

                                borderColor: shelf > 0 ?
                                    shelvesList.data.payload.find(s => s.shelf_id === shelf).color :
                                    shelvesList.data.payload[0].color
                            }}
                        >
                            <SelectValue placeholder="Choose Shelf" />
                        </SelectTrigger>

                        {/* Render list of the available shelves */}
                        <SelectContent>
                            {
                                shelvesList.data.payload.map((shelf, key) => {

                                    return (
                                        <SelectItem
                                            key={key}
                                            value={String(shelf.shelf_id)}
                                            style={{ color: shelf.color }}
                                        >
                                            {shelf.title}
                                        </SelectItem>
                                    )
                                })
                            }
                        </SelectContent>
                    </Select>
                    :

                    // If not shelves found, display the message
                    <Input
                        className="border-red-600 bg-red-900 bg-opacity-25 text-xs"
                        placeholder="No Shelves Found!"
                        readOnly
                    />
            }

            {/* Choose icon for the item */}
            <Input
                onChange={(event) => setIcon(event.target.files![0])}
                type="file"
                className="text-sm hover:ring-primary hover:ring-[2px]"
            />

            {/* Create button creates item and closes the dialog on click */}
            <DialogClose asChild>
                <Button onClick={onItemUpdate}>Update</Button>
            </DialogClose>

        </DialogContent>

    )

}
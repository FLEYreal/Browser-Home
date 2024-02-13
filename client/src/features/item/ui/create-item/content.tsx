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
import { getItemsKey, useCreateItems, useUpdateIcon } from "@/shared/api/item-api";
import { CurrentLength } from '@/shared/ui/current-length';

export default function CreateItemDialogContent({
    defaultShelf = -1
}: {
    defaultShelf?: number
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
    const [ids, setIds] = useState<number[]>([]);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState<File | null>(null); // Icon to set for the item
    const [shelf, setShelf] = useState<number>(defaultShelf); // Shelf's id the item belongs to

    // Mutation hooks
    const { mutate: createItem, ...itemProps } = useCreateItems({
        onSuccess: (data) => {

            queryClient.invalidateQueries({ queryKey: getShelvesKey })
            queryClient.invalidateQueries({ queryKey: getItemsKey })
            setIds((data as AxiosResponse<BackendResponseType, any>).data.payload as number[])

        }
    });
    const { mutate: updateIcon, ...iconProps } = useUpdateIcon();

    // Handlers
    const onItemCreate = () => {

        if (title.length > 32) toast({ title: 'Title length exceeds 32 symbols!', variant: 'destructive' })
        else if (description.length > 128) toast({ title: 'Description length exceeds 128 symbols!', variant: 'destructive' })
        else {

            // First, create item
            createItem([{
                shelf_fk: shelf,
                link: link,
                title: title,
                description: description
            }])

        }
    }

    // Effects
    useEffect(() => {
        if (ids.length >= 1 && icon) {

            // Then, when item is created update an image if it's provided
            updateIcon({
                item_id: ids[0],
                icon: icon
            });

        }
    }, [ids])

    useEffect(() => {

        // Define whether is there and error and if there is, get data of it
        const error = ((itemProps.error || iconProps.error) as AxiosError<BackendResponseType, any>) || null;

        // Display notification of an error if there is
        if (error) {

            toast({
                title: error.response!.data.title,
                description: error.response!.data.description,
                variant: 'destructive'
            })

        }

        // Show notification of succeffully created item
        if (itemProps.isSuccess && (icon ? iconProps.isSuccess : true)) {

            toast({ title: 'Successfully created item!' })

            // Reset values on successful creation
            setTitle('')
            setLink('')
            setDescription('')
            setIcon(null)
            setShelf(defaultShelf)

        }

    }, [
        itemProps.isError, itemProps.isSuccess,
        iconProps.isError, iconProps.isSuccess
    ])

    return (
        <DialogContent className="text-sm w-[400px]">

            <h2 className="text-center text-lg py-3">Create Item</h2>

            {/* Title for Item */}
            <div className="relative">
                <Input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Title"
                    className={title.length > 32 ? "text-sm border border-red-500" : "text-sm"}
                />
                <CurrentLength
                    current={title.length}
                    limit={32}
                />
            </div>

            {/* Link of the item */}
            <Input
                value={link}
                onChange={(event) => setLink(event.target.value)}
                placeholder="Link"
                className="text-sm"
            />

            {/* Description for Item */}
            <div className="relative">
                <Textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Description"
                    className={description.length > 128 ?
                        "text-sm resize-none h-24 border border-red-500" :
                        "text-sm resize-none h-24"
                    }
                />
                <CurrentLength
                    current={description.length}
                    limit={128}
                />
            </div>

            {/* Select shelf the item will belong to */}
            {
                shelvesList && shelvesList.data &&
                    shelvesList.data.payload && typeof shelvesList.data.payload === 'object' &&
                    shelvesList.data.payload.length >= 1
                    ? // Shelf list has to be defined
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
                <Button onClick={onItemCreate}>Create</Button>
            </DialogClose>

        </DialogContent>

    )

}
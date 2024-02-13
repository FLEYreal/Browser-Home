'use client'

// Basics
import { useEffect } from "react";
import { AxiosError } from "axios";

// Shadcn / Tailwind
import {
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { useToast } from "@/shared/ui/use-toast";

// Shared
import { BackendResponseType } from "@/shared/config/types";
import { useDeleteItems } from "@/shared/api/item-api";

export default function CreateItemDialogContent({ id = -1 }: { id?: number }) {

    // Toast
    const { toast } = useToast();

    // Mutation hooks
    const { mutate: deleteItem, ...itemProps } = useDeleteItems();

    // Handlers
    const onItemDelete = () => {

        // Delete item by id if it's provided
        if (id && id >= 1) deleteItem({
            "item_ids": [id]
        })

    }

    useEffect(() => {

        // Define whether is there and error and if there is, get data of it
        const error = ((itemProps.error) as AxiosError<BackendResponseType, any>) || null;

        // Display notification of an error if there is
        if (error) toast({
            title: error.response!.data.title,
            description: error.response!.data.description,
            variant: 'destructive'
        })

        // Show notification of succeffully created item
        if (itemProps.isSuccess) toast({ title: 'Successfully deleted item!' })

    }, [itemProps.isError, itemProps.isSuccess])

    return (
        <AlertDialogContent className="flex flex-col gap-7">

            {/* Header with Title and description */}
            <header className="flex flex-col justify-start gap-2">
                <AlertDialogTitle className="">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>You're deleting item #{id} and won't be able to cancel this action, are you sure, you want to continue?</AlertDialogDescription>
            </header>

            {/* Action bar of the dialog */}
            <section className="flex flex-row gap-2 justify-end">
                <AlertDialogCancel className="w-28">Cancel</AlertDialogCancel>
                <AlertDialogCancel
                    className="w-32 bg-red-700 hover:bg-red-600"
                    onClick={onItemDelete}
                >
                    Delete Item
                </AlertDialogCancel>
            </section>

        </AlertDialogContent>
    )

}
'use client'

// Basics
import { AxiosError } from "axios";
import { useEffect } from "react";

// Shadcn / Tailwind
import {
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel
} from "@/shared/ui/alert-dialog";
import { useToast } from "@/shared/ui/use-toast";

// Shared
import { useDeleteShelves, createShelvesKey } from "@/shared/api/shelf-api";
import { BackendResponseType } from "@/shared/config/types";

// Content for common modal window for shelf deletion
export default function DeleteShelfDialogContent({ id = -1 }: { id?: number }) {

    // Delete Shelf Query
    const { mutate: deleteShelf, isError, isSuccess, error } = useDeleteShelves();

    // Hooks
    const { toast } = useToast();

    // Handlers
    const onShelfDelete = () => {

        // Delete shelf by id if it's provided
        if (id && id >= 1) deleteShelf({
            "shelf_ids": [id]
        })

    }

    // If error on deleting shelf
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
                title: 'Successfully deleted shelf!'
            })
        }

    }, [isError, isSuccess])

    return (
        <AlertDialogContent className="flex flex-col gap-7">

            {/* Header with Title and description */}
            <header className="flex flex-col justify-start gap-2">
                <AlertDialogTitle className="">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>You're deleting entire shelf with all of its items. You won't be able to cancel this action, are you sure, you want to continue?</AlertDialogDescription>
            </header>

            {/* Action bar of the dialog */}
            <section className="flex flex-row gap-2 justify-end">
                <AlertDialogCancel className="w-28">Cancel</AlertDialogCancel>
                <AlertDialogCancel
                    className="w-32 bg-red-700 hover:bg-red-600"
                    onClick={onShelfDelete}
                >
                    Delete Shelf
                </AlertDialogCancel>
            </section>

        </AlertDialogContent>
    )

}
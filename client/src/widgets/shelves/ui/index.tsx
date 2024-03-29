'use client'

// Basics
import { HTMLAttributes, useEffect } from "react";
import { AxiosError } from "axios";

// Features
import { CreateShelfBtn, CreateShelfWidget } from "@/features/shelf";

// Shared
import { useLoadingContext } from '@/shared/utils/loading-context';
import { BackendResponseType } from "@/shared/config/types";
import { useGetShelves } from "@/shared/api/shelf-api";
import { BtnFallback } from "@/shared/ui/error-fallback";
import { LoadingFallback } from "@/shared/ui/loading-fallback";

// Insides
import Shelf from './shelf';
import ShelfProvider from "./provider";

// Interfaces
export interface ShelvesProps extends HTMLAttributes<HTMLDivElement> { }

export default function Shelves({ ...props }: ShelvesProps) {

    // Get Loading Context data
    const { setQueue } = useLoadingContext()

    // When all items are loaded, request to get all shelves
    const shelves = useGetShelves();

    useEffect(() => {
        if (shelves.isSuccess) {

            // Delete query item from loading queue
            setQueue(prev => prev.filter(i => i.id !== 2))

        }
    }, [shelves.isSuccess])

    // When shelves are loading
    if (shelves.isLoading) return <LoadingFallback className="mt-8" />

    // When error occured
    else if (shelves.isError) {

        return (
            <BtnFallback

                // Data for toast notification
                response={(shelves.error as AxiosError<BackendResponseType, any>).response?.data}

                // To add refetch button to UI
                refetch={() => shelves.refetch()}

                className="mt-8"
            />
        )
    }

    // If everything succeed
    else if (
        shelves.data && shelves.data.payload
    ) return (
        <>
            <div {...props}>

                {
                    // Show shelves if there's at least 1
                    shelves.data.payload.length > 0 ?
                        (
                            <>
                                {/* Iterate and display each shelf */}
                                {
                                    shelves.data.payload!.map((shelf, key) => {

                                        // Find all items of this shelf
                                        // const shelf_items = items.data?.payload!.filter(item => item.shelf_fk === shelf.shelf_id) || []

                                        // Display Shelf
                                        return (
                                            <ShelfProvider key={key} data={shelf}>
                                                <Shelf />
                                            </ShelfProvider>
                                        )

                                    })
                                }

                                {/* Big button to create new shelf */}
                                <CreateShelfWidget className="my-20" />
                            </>
                        ) : (

                            // If there's no shelves found, display message and button to create one
                            <div className="mb-6 mt-12 text-center flex flex-col items-center gap-2">
                                <div className="text-xl">No Shelves Found!</div>
                                <div className="text-sm text-[16px] w-1/2">Time to create one, you can do it by clicking "+" or the button in the header.</div>
                                <CreateShelfBtn className="text-sm px-8 mt-4" />
                            </div>
                        )

                }

            </div>
        </>
    )
}

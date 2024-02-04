'use client'

// Basics
import { HTMLAttributes } from "react";
import { AxiosError } from "axios";

// Features
import { CreateShelfBtn, CreateShelfWidget } from "@/features/new-shelf";

// Shared
import { BackendResponseType } from "@/shared/config/types";
import { useGetShelves } from "@/shared/api/shelf-api";
import { BtnFallback } from "@/shared/ui/error-fallback";
import { LoadingFallback } from "@/shared/ui/loading-fallback";
import { useGetItems } from "@/shared/api/item-api";

// Insides
import Shelf from './shelf';

// Interfaces
export interface ShelvesProps extends HTMLAttributes<HTMLDivElement> { }

export default function Shelves({ ...props }: ShelvesProps) {

    // Get all items
    const items = useGetItems()

    // When all items are loaded, request to get all shelves
    const shelves = useGetShelves({ enabled: !!items.data });

    // When shelves are loading
    if (shelves.isLoading || items.isLoading) return <LoadingFallback className="mt-8" />

    // When error occured
    else if (shelves.isError || items.isError) return (
        <BtnFallback

            // Data for toast notification
            response={
                (shelves.error as AxiosError<BackendResponseType, any>).response?.data ||
                (items.error as AxiosError<BackendResponseType, any>).response?.data
            }

            // To add refetch button to UI
            refetch={() => {
                items.refetch();
                shelves.refetch();
            }}

            className="mt-8"
        />
    )

    // If everything succeed
    else if (
        shelves.data && shelves.data.payload &&
        items.data && items.data.payload
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
                                        const shelf_items = items.data?.payload!.filter(item => item.shelf_fk === shelf.shelf_id) || []

                                        // Display Shelf
                                        return (
                                            <Shelf key={key} data={{
                                                ...shelf,
                                                items: shelf_items
                                            }} />
                                        )

                                    })
                                }

                                {/* Big button to create new shelf */}
                                <CreateShelfWidget className="my-20" />
                            </>
                        ) : (

                            // If there's not shelves found, display message and button to create one
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
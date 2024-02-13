'use client'

// Basics
import { AxiosError } from "axios";

// Features
import { Item, sizes } from "@/features/item";

// Shared
import { useGetItems } from "@/shared/api/item-api";
import { LoadingFallback } from "@/shared/ui/loading-fallback";
import { BtnFallback } from "@/shared/ui/error-fallback";
import { BackendResponseType } from "@/shared/config/types";

// Insides
import { useShelfContext } from "../provider";

// Section with all items belong to current shelf
export default function ShelfItems() {

    // Context Data
    const { data, size } = useShelfContext();
    const { color, shelf_id } = data;

    // Get item list
    const { data: items, ...itemsData } = useGetItems({
        key: [{ 'shelf_id': shelf_id }],
        query: { shelf_id: shelf_id }
    })

    // When shelves are loading
    if (itemsData.isLoading) return <LoadingFallback className="mt-2" />

    // When error occured
    else if (itemsData.isError) {

        return (
            <BtnFallback

                // Data for toast notification
                response={(itemsData.error as AxiosError<BackendResponseType, any>).response?.data}

                // To add refetch button to UI
                refetch={() => itemsData.refetch()}

                className="mt-8"
            />
        )
    }

    else if(
        items && items.payload
    ) return (
        <section
            style={{ gap: sizes[size].gap }}
            className="mt-5 flex flex-row flex-wrap"
        >
            {
                items.payload.map((item, key) => {

                    return (
                        <Item
                            key={key}
                            data={{
                                size: size,
                                item_id: item.item_id,
                                shelf_fk: item.shelf_fk,
                                title: item.title,
                                link: item.link,
                                description: item.description || undefined,
                                created_at: item.created_at,
                                color: color
                            }}
                        />
                    )
                })
            }
        </section>
    )

}
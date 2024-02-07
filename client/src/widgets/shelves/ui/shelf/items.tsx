'use client'

// Features
import { Item, sizes } from "@/features/item";

// Insides
import { useShelfContext } from "../provider";

// Section with all items belong to current shelf
export default function ShelfItems() {

    // Context Data
    const { data, size } = useShelfContext();
    const { items, color } = data;

    return (
        <section
            style={{ gap: sizes[size].gap }}
            className="mt-5 flex flex-row flex-wrap"
        >
            {
                items.map((item, key) => {

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
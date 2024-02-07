'use client'

// Basics
import { createContext, useContext, HTMLAttributes } from "react";

// Shared
import { useGetIcon } from '@/shared/api/item-api';

// Insides
import ItemWrapper from "./item-wrapper";

// Interfaces & Types
export type ItemSize = 'medium' | 'small' | 'smaller' | 'default'; // Size of the item
export type ItemProps = { // Global context properties of the item
    icon?: string | null;
    size: ItemSize;
    item_id: number;
    shelf_fk: number;
    title: string;
    link: string;
    description?: string;
    created_at: string;
    color?: string;
}

export interface ItemWrapperProps {
    itemAttrs?: HTMLAttributes<HTMLDivElement>;
    cardAttrs?: HTMLAttributes<HTMLDivElement>;
}

export interface ItemProviderProps extends ItemWrapperProps { // Attributes to item component
    data: Omit<ItemProps, 'icon'>; // Provide everything except for icon, it'll be received inside
};

// Context Data
export const ItemContext = createContext<ItemProps>({
    size: 'default',
    item_id: -1,
    shelf_fk: -1,
    title: '',
    link: '',
    description: '',
    created_at: '',
    color: '#ffffff'
});

// Hook to get Context Data
export const useItemContext = () => useContext<ItemProps>(ItemContext)

// Item Component
export default function Item({ itemAttrs, cardAttrs, data }: ItemProviderProps) {

    // Receive item's icon, returns null if there's no icon
    const { data: icon } = useGetIcon({
        query: {
            item_id: data.item_id
        }
    })

    return (
        <ItemContext.Provider value={{
            ...data,
            icon: icon
        }}>
            <ItemWrapper itemAttrs={itemAttrs} cardAttrs={cardAttrs} />
        </ItemContext.Provider>
    )

}

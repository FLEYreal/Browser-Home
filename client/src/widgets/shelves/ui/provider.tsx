'use client'

// Basics
import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

// Features
import { ItemSize, ItemProps } from "@/features/item";

// Interfaces
export interface ShelfDataProps {
    // Properties of the Shelf
    shelf_id: number;
    title: string;
    description: string;
    color: string;
    created_at: string;
    
    // Provide list of items of the Shelf
    items: ItemProps[];
}

export interface ShelfContextProps {
    size: ItemSize;
    setSize: Dispatch<SetStateAction<ItemSize>>;
    data: ShelfDataProps;
    setData: Dispatch<SetStateAction<ShelfDataProps>>;
}

// Context
export const ShelfContext = createContext<ShelfContextProps>({
    size: 'medium',
    setSize: () => { },
    data: {
        shelf_id: -1,
        title: '',
        description: '',
        color: '',
        created_at: '',
        items: []
    },
    setData: () => { }
})

// Context hook
export const useShelfContext = () => useContext<ShelfContextProps>(ShelfContext)

// Context Provider
export default function ShelfProvider({ children, data: shelfData }: { children: ReactNode, data?: ShelfDataProps }) {

    // Context States
    const [size, setSize] = useState<ItemSize>('medium');
    const [data, setData] = useState<ShelfDataProps>(shelfData || {
        shelf_id: -1,
        title: '',
        description: '',
        color: '',
        created_at: '',
        items: []
    })

    return (
        <ShelfContext.Provider value={{ size, setSize, data, setData }}>
            {children}
        </ShelfContext.Provider>
    )

}
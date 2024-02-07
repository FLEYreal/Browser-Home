'use client'

// Basics
import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";

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
    size: 'default',
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
    const [size, setSize] = useState<ItemSize>('default');
    const [data, setData] = useState<ShelfDataProps>(shelfData || {
        shelf_id: -1,
        title: '',
        description: '',
        color: '',
        created_at: '',
        items: []
    })

    // Effects
    useEffect(() => { // Setup new size for the shelf
        if (
            // As it's default state value, it can't be saved to localstorage on each mount overlapping previous values
            size !== 'default' &&
            localStorage.getItem(`size-${data.shelf_id}`) !== size && // Don't save same value
            data.shelf_id > 0 // Checks if shelf is loaded already
        ) {
            localStorage.setItem(`size-${data.shelf_id}`, size);
        }
    }, [size, data.shelf_id])

    useEffect(() => { // On mount, Get shelf's size from storage if there is 
        const storedSize = localStorage.getItem(`size-${data.shelf_id}`) as ItemSize;
        if (storedSize) setSize(storedSize)
    }, [])


    return (
        <ShelfContext.Provider value={{ size, setSize, data, setData }}>
            {children}
        </ShelfContext.Provider>
    )

}
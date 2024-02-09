'use client'

// Basics
import { Dispatch, SetStateAction, createContext, useContext } from "react"

// Interfaces & Types

/**
 * Represents the type definition for a queue item.
 * 
 * @property {number} id - The unique identifier for the queue item.
 * @property {string} name - The name associated with the queue item.
 * @property {string} message - The message to display while loading the element
 */
export type queueItem = {
    id: number;
    name: string;
    message: string;
}

export interface LoadingContextProps {
    queue: queueItem[];
    setQueue: Dispatch<SetStateAction<queueItem[]>>;
}

// Context Data
export const LoadingContext = createContext<LoadingContextProps>({
    queue: [],
    setQueue: () => { }
})

/**
 * Hook to receive loader's context
 *
 * @returns {queueItem[]} queue - An array of items to load, remove them one after another once code associated with item is loaded
 * @returns {Dispatch<SetStateAction<queueItem[]>>} setQueue - Lets you remove certain items
 */
export const useLoadingContext = (): LoadingContextProps => useContext(LoadingContext);
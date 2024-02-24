'use client'

// Basics
import { useContext, createContext, Dispatch, SetStateAction } from 'react'

// Types & Interfaces
/**
 * List of available themes, to create new, update this first with new name
 */
export type DesignType = 'future' | 'nature' | 'cold' | 'strawberry' | 'orange' | 'binance-like' | 'default'

/**
 * Context object with certain's design info
 * 
 * @property {DesignType} name - Name of the theme
 * @property {string} color - What's main color of the theme (can only contain colors existing in tailwind's palette)
 * @property {string} emoji - Emoji associated with theme, like snowflake with cold theme
 */
export interface DesignsListProps {
    id: number;
    name: DesignType;
    color: string;
    emoji?: string;
}

export interface DesignContextProps {
    designs: DesignsListProps[];
    design: DesignsListProps
    setDesign: Dispatch<SetStateAction<DesignsListProps>>
}

// Vairables
export const designs: DesignsListProps[] = [
    { id: 1, name: 'future', color: 'white', emoji: '💜' },
    { id: 2, name: 'nature', color: 'lime', emoji: '🍀' },
    { id: 3, name: 'cold', color: 'blue', emoji: '❄️' },
    { id: 4, name: 'strawberry', color: 'red', emoji: '🍓' },
    { id: 5, name: 'orange', color: 'orange', emoji: '🍊' },
    { id: 6, name: 'binance-like', color: 'yellow', emoji: '🪙' },
    { id: 7, name: 'default', color: 'gray' }
]

// Create Context Item
export const DesignContext = createContext<DesignContextProps>({
    designs,
    design: { id: 7, name: 'default', color: 'gray' },
    setDesign: () => { }
})

/**
 * Context hook to receive current design data
 *
 * @returns {DesignType} design - Current design
 * @returns {Dispatch<SetStateAction<DesignType>>} setDesign - Change current design to new chosen one
 */
export const useDesignContext = (): DesignContextProps => useContext(DesignContext)

'use client'

// Basics
import { useContext, createContext, Dispatch, SetStateAction } from 'react'

// Types & Interfaces
/**
 * List of available themes, to create new, update this first with new name
 */
export type designType = 'future' | 'nature' | 'cold' | 'strawberry' | 'orange' | 'binance-like' | 'default'

/**
 * Context object with certain's design info
 * 
 * @property {designType} name - Name of the theme
 * @property {string} color - What's main color of the theme (can only contain colors existing in tailwind's palette)
 * @property {string} emoji - Emoji associated with theme, like snowflake with cold theme
 */
export interface DesignsListProps {
    name: designType;
    color: string;
    emoji?: string;
}

export interface DesignContextProps {
    design: designType
    setDesign: Dispatch<SetStateAction<designType>>
}

// Vairables
export const designs: DesignsListProps[] = [
    { name: 'future', color: 'white', emoji: '💜' },
    { name: 'nature', color: 'lime', emoji: '🍀' },
    { name: 'cold', color: 'blue', emoji: '❄️' },
    { name: 'strawberry', color: 'red', emoji: '🍓' },
    { name: 'orange', color: 'orange', emoji: '🍊' },
    { name: 'binance-like', color: 'orange', emoji: '🪙' },
    { name: 'default', color: 'gray' }
]

// Create Context Item
export const DesignContext = createContext<DesignContextProps>({
    design: 'default',
    setDesign: () => { }
})

/**
 * Context hook to receive current design data
 *
 * @returns {designType} design - Current design
 * @returns {Dispatch<SetStateAction<designType>>} setDesign - Change current design to new chosen one
 */
export const useDesignContext = (): DesignContextProps => useContext(DesignContext)

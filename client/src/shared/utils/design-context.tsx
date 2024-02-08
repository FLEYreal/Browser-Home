'use client'

// Basics
import { useContext, createContext, Dispatch, SetStateAction } from 'react'

// Types & Interfaces
export type designType = 'future' | 'nature' | 'cold' | 'strawberry' | 'orange' | 'binance-like' | 'default'
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

// Create Context Hook
export const useDesignContext = () => useContext<DesignContextProps>(DesignContext)

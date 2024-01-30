'use client'

// Basics
import { useContext, createContext, ReactNode, Dispatch, SetStateAction, useState, useLayoutEffect } from 'react'

// Types & Interfaces
export type designType = 'future' | 'nature' | 'cold' | 'strawberry' | ''
export interface DesignsListProps {
    name: designType;
    color: string;
}
export interface DesignContextProps {
    design: designType
    setDesign: Dispatch<SetStateAction<designType>>
}

// Vairables
export const designs: DesignsListProps[] = [
    { name: 'future', color: 'white' }, 
    { name: 'nature', color: 'lime' },
    { name: 'cold', color: 'blue' }, 
    { name: 'strawberry', color: 'red' },
    { name: '', color: 'gray' }
]

// Create Context Item
export const DesignContext = createContext<DesignContextProps>({
    design: '',
    setDesign: () => { }
})

// Create Context Hook
export const useDesign = () => useContext<DesignContextProps>(DesignContext)

// Provider
export default function DesignProvider({ children, className }: { children?: ReactNode, className?: string }) {

    // Setup default design
    const [design, setDesign] = useState<designType>(localStorage.getItem('design') as designType | '')

    // Save / Update design state in localstorage
    useLayoutEffect(() => {
        localStorage.setItem('design', design)
    }, [design])

    return (
        <DesignContext.Provider value={{ design, setDesign }}>
            <body className={`${design} ${className}`}>
                {children}
            </body>
        </DesignContext.Provider>
    )

}
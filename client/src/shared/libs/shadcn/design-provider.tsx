'use client'

import { useContext, createContext, ReactNode, Dispatch, SetStateAction, useState, useLayoutEffect } from 'react'

// Types & Interfaces
export type designType = 'future' | 'nature' | 'cold' | 'strawberry' | ''
export interface DesignContextProps {
    design: designType
    setDesign: Dispatch<SetStateAction<designType>>
}

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
        localStorage.setItem('design', 'future')
    }, [design])

    return (
        <DesignContext.Provider value={{ design, setDesign }}>
            <main className={`${design} ${className}`}>
                {children}
            </main>
        </DesignContext.Provider>
    )

}
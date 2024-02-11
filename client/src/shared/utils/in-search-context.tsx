'use client'

// Basics
import { Dispatch, SetStateAction, createContext, useContext } from "react"

// Interfaces & Types

export interface InSearchContextProps {
    inSearchMode: boolean;
    setInSearchMode: Dispatch<SetStateAction<boolean>>;
}

// Context Data
export const InSearchContext = createContext<InSearchContextProps>({
    inSearchMode: false,
    setInSearchMode: () => { }
})

/**
 * Hook to receive loader's context
 *
 * @returns {boolean} inSearchMode - whether it's search mode of the page or normal
 * @returns {Dispatch<SetStateAction<boolean>>} setQueue - lets you switch in-search-mode
 */
export const useInSearchContext = (): InSearchContextProps => useContext(InSearchContext);
'use client'

// Basics
import { Dispatch, SetStateAction, createContext, useContext } from "react"

// Interfaces & Types

export interface InSearchContextProps {
    inSearchStatus: boolean;
    setInSearchStatus: Dispatch<SetStateAction<boolean>>;
    inSearchMode: boolean;
    setInSearchMode: Dispatch<SetStateAction<boolean>>;
}

// Context Data
export const InSearchContext = createContext<InSearchContextProps>({
    inSearchStatus: false,
    setInSearchStatus: () => { },
    inSearchMode: false,
    setInSearchMode: () => { }
})

/**
 * Hook to receive loader's context
 *
 * @returns {boolean} inSearchStatus - Define whether to use search mode on Search
 * @returns {Dispatch<SetStateAction<boolean>>} setQueue - Switch in-search option
 * @returns {boolean} inSearchMode - Whether page in-search mode
 * @returns {Dispatch<SetStateAction<boolean>>} setInSearchMode - Switch from / to in-search mode
 */
export const useInSearchContext = (): InSearchContextProps => useContext(InSearchContext);
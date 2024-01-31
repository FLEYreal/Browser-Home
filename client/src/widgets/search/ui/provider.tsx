'use client'

// Basics
import { useContext, createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

// Interfaces & Types
export type EngineState = 'google' | 'yandex' | 'bing' | 'duckduckgo';
export type EngineStates = EngineState[];
export interface SearchContextProps {
    engines: EngineStates
    setEngines: Dispatch<SetStateAction<EngineStates>>
}

// Context
export const SearchContext = createContext<SearchContextProps>({
    engines: [],
    setEngines: () => { }
})

// Hook
export const useSearchContext = () => {
    return useContext(SearchContext)
}

// Provider
export default function SearchProvider({ children }: { children: ReactNode }) {

    // Search Engines to use
    const [engines, setEngines] = useState<EngineStates>(['bing', 'duckduckgo', 'google', 'yandex'])

    return (
        <SearchContext.Provider value={{ engines, setEngines }}>
            {children}
        </SearchContext.Provider>
    )

}
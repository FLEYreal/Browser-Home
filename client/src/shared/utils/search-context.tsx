'use client'

// Basics
import {
    useContext,
    createContext,
    Dispatch,
    SetStateAction
} from 'react';

// Interfaces & Types
export type EngineState = 'google' | 'yandex' | 'bing' | 'duckduckgo' | 'youtube';
export type EngineStates = EngineState[] | null;
export interface SearchContextProps {
    engines: EngineStates
    setEngines: Dispatch<SetStateAction<EngineStates>>;
    sameTab: boolean | null;
    setSameTab: Dispatch<SetStateAction<boolean | null>>;
    searchRef: React.MutableRefObject<HTMLInputElement | null> | null;
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
}

// Context
export const SearchContext = createContext<SearchContextProps>({
    engines: [],
    setEngines: () => { },
    sameTab: false,
    setSameTab: () => { },
    searchRef: null,
    query: '',
    setQuery: () => { }
})

/**
 * Hook to get Search context data
 * 
 * @returns {EngineStates} engines - List of engines currently used in search
 * @returns {Dispatch<SetStateAction<EngineStates>>} setEngines - Toggle search engines
 * @returns {boolean | null} sameTab - Do search in the same tab as Browser-Home or open search engines in another tab?
 * @returns {Dispatch<SetStateAction<boolean | null>>} setSameTab - Switch same tab option
 * @returns {React.MutableRefObject<HTMLInputElement | null> | null} searchRef - Search Bar reference
 * @returns {string} query - Query inside search input
 * @returns {Dispatch<SetStateAction<string>>} setQuery - Update query inside search input
 */
export const useSearchContext = (): SearchContextProps => useContext(SearchContext)
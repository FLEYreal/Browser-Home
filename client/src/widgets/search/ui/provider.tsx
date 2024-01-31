'use client'

// Basics
import {
    useContext,
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    ReactNode,
    useEffect
} from 'react';

// Interfaces & Types
export type EngineState = 'google' | 'yandex' | 'bing' | 'duckduckgo';
export type EngineStates = EngineState[] | null;
export interface SearchContextProps {
    engines: EngineStates
    setEngines: Dispatch<SetStateAction<EngineStates>>;
    sameTab: boolean | null;
    setSameTab: Dispatch<SetStateAction<boolean | null>>;
}

// Context
export const SearchContext = createContext<SearchContextProps>({
    engines: [],
    setEngines: () => { },
    sameTab: false,
    setSameTab: () => { }
})

// Hook
export const useSearchContext = () => {
    return useContext(SearchContext)
}

// Provider
export default function SearchProvider({ children }: { children: ReactNode }) {

    // Search Engines to use
    const [engines, setEngines] = useState<EngineStates>(null)
    const [sameTab, setSameTab] = useState<boolean | null>(null)

    // Search Engine Effect(s)
    useEffect(() => {
        if (
            engines && // Made to escape saving "null" to localstorage each mount (which kills any meaning of localstorage)
            JSON.parse(localStorage.getItem('engines')!) as EngineStates !== engines // Why saving same value?
        ) {
            localStorage.setItem('engines', JSON.stringify(engines))
        }
    }, [engines])

    // Same Tab Effect(s)
    useEffect(() => {
        if (
            sameTab !== null && sameTab !== undefined && // Made to escape saving "null" to localstorage each mount (which kills any meaning of localstorage)
            JSON.parse(localStorage.getItem('sameTab')!) !== sameTab // Why saving same value?
        ) {
            console.log(localStorage.getItem('sameTab'))
            localStorage.setItem('sameTab', JSON.stringify(sameTab))
        }
    }, [sameTab])

    // Main Effects
    useEffect(() => {

        // Get settings from localstorage
        const storedEngines = localStorage.getItem('engines')
        const storedSameTab = localStorage.getItem('sameTab')

        // Define used settings from localstorage is there is
        if (storedEngines) setEngines(JSON.parse(storedEngines))
        if (storedSameTab) setSameTab(JSON.parse(storedSameTab))

        // Store setting in localStorage if storage is empty
        if (!storedEngines) localStorage.setItem('engines', JSON.stringify(['google']))
        if (!storedSameTab) localStorage.setItem('sameTab', JSON.stringify(false))

    }, [])


    return (
        <SearchContext.Provider value={{
            engines, setEngines,
            sameTab, setSameTab
        }}>
            {children}
        </SearchContext.Provider>
    )

}
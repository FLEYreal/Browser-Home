'use client'

// Basics
import { ReactNode, useState } from "react";

// Shared
import { InSearchContext } from "@/shared/utils/in-search-context";

// Used to provide in-search mode context. InSearch mode is when search engines open not in another tab 
// but inside the page inside specific containers and the entire page has to shrink to fit the page inside Browser-Home
export default function InSearchProvider({ children }: { children: ReactNode }) {

    // State to define search mode
    const [inSearchStatus, setInSearchStatus] = useState(false);

    return (
        <InSearchContext.Provider value={{ inSearchStatus, setInSearchStatus }}>
            {children}
        </InSearchContext.Provider>
    )
}
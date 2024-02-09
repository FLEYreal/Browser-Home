'use client'

// Basics
import { ReactNode } from 'react';

// Providers
import LoadingProvider from './loading-provider';
import DesignProvider from './design-provider';
import QueryProvider from './query-provider';

// List of all providers
const components = [
    LoadingProvider, // It's important for it to be in the top as other providers use its context
    DesignProvider,
    QueryProvider
]

// Combine all providers
export default function Providers({ children }: { children: ReactNode }) {

    return (
        <>
            {
                // Wrap all providers 
                components.reduceRight((accum, Current) => (
                    <Current>{accum}</Current>
                ), children)
            }
        </>
    )

}
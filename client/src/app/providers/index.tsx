'use client'

// Basics
import { ReactNode } from 'react';

// Providers
import DesignProvider from './design-provider';
import QueryProvider from './query-provider';

// List of all providers
const components = [
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
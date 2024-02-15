'use client'

// Basics
import { ReactNode } from 'react';

// Providers
import LoadingProvider from './loading-provider';
import DesignProvider from './design-provider';
import QueryProvider from './query-provider';
import KeybindsProvider from './keybinds-provider';
import SearchProvider from './search-provider';

// List of all providers
const components = [
    LoadingProvider, // It's important for it to be in the bottom as other providers use its context
    QueryProvider,
    DesignProvider,
    SearchProvider,
    KeybindsProvider // It's important for it to be last this provider uses all the contexts to set keybinds
]

// Combine all providers
const Providers = ({ children }: { children: ReactNode }) => components.reduceRight((accum, Current) => (
    <Current>{accum}</Current>
), children)


export default Providers;
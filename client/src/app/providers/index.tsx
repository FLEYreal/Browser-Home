'use client'

// Basics
import { ReactNode } from 'react';

// Providers
import LoadingProvider from './loading-provider';
import DesignProvider from './design-provider';
import QueryProvider from './query-provider';

// List of all providers
const components = [
    QueryProvider,
    DesignProvider,
    LoadingProvider, // It's important for it to be in the bottom as other providers use its context
]

// Combine all providers
const Providers = ({ children }: { children: ReactNode }) => components.reduceRight((accum, Current) => (
    <Current>{accum}</Current>
), children)


export default Providers;
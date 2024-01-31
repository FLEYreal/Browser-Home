'use client'

// Basics
import { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

// Provider
export default function Provider({ children }: { children: ReactNode }) {

    // Create instance of Query Client
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
                {children}
        </QueryClientProvider>
    )
}
'use client'

// Basics
import { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query';
import { AxiosError } from "axios";

// Shadcn / Tailwind
import { useToast } from "@/shared/ui/use-toast";

// Shared
import { BackendResponseType } from "@/shared/config/types";
import { QUERY_KEYS } from "@/shared/config/vars";

// Provider
export default function QueryProvider({ children }: { children: ReactNode }) {

    // Hooks
    const { toast } = useToast();

    // Create instance of Query Client
    const [queryClient] = useState(() => new QueryClient({
        queryCache: new QueryCache({

            // Global on Error callback
            onError: (error, query) => {

                // Error handling for own backend enpdoints
                if (query.queryKey.find(i => i === QUERY_KEYS[0]) && error) {

                    // Get JSON error body from backend
                    const data = (error as AxiosError<BackendResponseType>).response!.data

                    // Show UI notification of an error
                    toast({
                        title: data.title,
                        description: `[${(query.queryKey[0] as string).toUpperCase()}] ${data.description}`,
                        variant: 'destructive'
                    })

                }

                // If other API used, like binance one for currencies
                else {
                    // Show UI notification of an error
                    toast({
                        title: 'Network Error Occured!',
                        description: `[${(query.queryKey[0] as string).toUpperCase()}] ${error.message}`,
                        variant: 'destructive'
                    })
                }


            }
        })
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
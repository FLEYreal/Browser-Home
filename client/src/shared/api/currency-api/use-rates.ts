'use client'

// Basics
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

// Shared
import { customQuery } from '@/shared/config/types';

// Types & Interfaces
export type responseType = { date: string; usd: object }
export type ratesType = 'load' | 'get'

// Variables
export const ratesApiUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json"
export const getRatesKey = ['currency-rates']
export const getRates = () => axios.get<responseType>(ratesApiUrl)

// Hook to get exchange rates for every currency to USD
export const useRates = (props: customQuery = {}) => {

    return useQuery({

        queryKey: getRatesKey,
        queryFn: getRates,
        staleTime: Infinity,
        select: (data: unknown) => {
            // Get body response
            return (data as AxiosResponse<responseType, any>).data.usd;
        },

        ...props
    });

}

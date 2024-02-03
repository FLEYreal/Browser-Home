'use client'

// Basics
import { QueryKey, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

// Shared
import { customQuery } from '@/shared/config/types';

// Search Bar Hook for USD Rates
export const usdKey = ['usd-rate']
export const usdUrl = "https://api.exchangerate-api.com/v4/latest/USD"
export const getUsd = () => axios.get(usdUrl)
export const useUSD = () => useQuery({
    queryKey: usdKey,
    queryFn: getUsd,
    refetchInterval: 8000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchIntervalInBackground: false,
    select: (data: AxiosResponse) => {
        if (data && data.data) {
            return data.data.rates.RUB
        }
    }
})

// Search Bar Hook for BTC rates
export const btcKey = ['btc-rate']
export const btcUrl = "https://blockchain.info/ticker"
export const getBtc = () => axios.get(btcUrl)
export const useBTC = () => useQuery({
    queryKey: btcKey,
    queryFn: getBtc,
    refetchInterval: 8000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchIntervalInBackground: false,
    select: (data: AxiosResponse) => {
        if (data && data.data) {
            return data.data.USD.buy
        }
    }
})


// API exchange rates
export interface ratesProps extends customQuery {
    key: QueryKey;
}


export type responseType = { date: string; usd: object }
export const ratesApiUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json"
export const getRates = () => axios.get<responseType>(ratesApiUrl)
export const useRates = ({
    key, ...props
}: ratesProps) => {
    
    return useQuery({

        queryKey: key,
        queryFn: getRates,
        staleTime: Infinity,
        select: (data: unknown) => {
            // Get body response
            return (data as AxiosResponse<responseType, any>).data.usd;
        },

        ...props
    });
}

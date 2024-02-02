'use client'

// Basics
import { QueryKey, useQuery } from '@tanstack/react-query';
import axios, { Axios, AxiosResponse } from 'axios';

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

// Binance API exchange rates for currency exchanger
export interface ratesProps extends customQuery {
    key: QueryKey;
}

export const binanceApiUrl = "https://api.binance.com/api/v3/ticker/price"
export const getBinanceRates = () => axios.get(binanceApiUrl)
export const useRates = ({
    key, ...props
}: ratesProps) => {

    type responseType = { symbol: string, price: string }[]
    type returnType = { from: string, to: string, price: string }[]

    return useQuery<AxiosResponse<responseType, any>, unknown, returnType>({
        queryKey: key,
        queryFn: getBinanceRates,
        staleTime: Infinity,
        select: (d) => {

            // Get body response
            const data = (d as AxiosResponse<responseType, any>).data
            
            // Transform array to properly work with
            const transformed: returnType = data.map(i => {
                return {
                    from: i.symbol.slice(0, 3),
                    to: i.symbol.slice(-3),
                    price: i.price
                }
            })

            // Return transformed array
            return transformed;
        },
        ...props
    })

}


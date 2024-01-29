'use client'

// Basics
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

// Get USD to RUB rates
const usdKey = ['usd-rate']
const usdUrl = "https://api.exchangerate-api.com/v4/latest/USD"
const getUsd = () => axios.get(usdUrl)
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

// Get BTC to USD rates
const btcKey = ['btc-rate']
const btcUrl = "https://blockchain.info/ticker"
const getBtc = () => axios.get(btcUrl)
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
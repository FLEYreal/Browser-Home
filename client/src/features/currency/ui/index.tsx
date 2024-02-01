'use client'

// Basics
import React, { useEffect } from 'react'

// Shadcn / Tailwind
import { useToast } from "@/shared/ui/use-toast"

// API
import { useUSD, useBTC } from '../../../shared/api/currency-api'

// Insides
import LoadingCurrency from './loading'

function Currency() {

    // Notification
    const { toast } = useToast()

    // Get Currencies
    const { data: usdToRubRate, ...resultUSD } = useUSD()
    const { data: usdToBtcRate, ...resultBTC } = useBTC()

    useEffect(() => {

        if (resultBTC.error || resultUSD.error) {

            // If there's an error, display it in notification
            toast({
                title: 'Error while loading exchange rates!',
                description: resultBTC.error!.message || resultUSD.error!.message,
                variant: "destructive"
            })
        }

    }, [resultUSD.isError, resultBTC.isError])

    // If result's loading
    if (resultBTC.isLoading || resultUSD.isLoading) {
        return <LoadingCurrency />
    }

    // If error occured in any of queries
    if (resultBTC.isError || resultUSD.isError) {
        // Display loading component until error is resolved
        return <LoadingCurrency />
    }

    // If everything is OK, display exchange rates
    return (
        <div className='flex gap-5'>
            <h2 className='text-sm'>$ {usdToRubRate}</h2>
            <h2 className='text-sm'>₿ {usdToBtcRate}</h2>
        </div>
    )
}

export default Currency;

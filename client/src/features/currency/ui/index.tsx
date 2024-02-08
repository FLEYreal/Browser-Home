'use client'

// Shared
import { useRates, useConvert, supportedCurrencyType } from '@/shared/api/currency-api';

// Insides
import CurrencyLoading from './loading';

// Display 2 currencies as a small widget
function Currency() {

    const { data, isLoading } = useRates();
    const rates = data as { [key in supportedCurrencyType['id']]: number }

    // If everything is OK, display exchange rates
    if(isLoading) return (<CurrencyLoading/>)
    else return (
        <div className='flex gap-5'>
            <h2 className='text-sm'>$ {useConvert(rates, 'usd', 'rub', 1)}</h2>
            <h2 className='text-sm'>₿ {useConvert(rates, 'btc', 'usd', 1)}</h2>
        </div>
    );
}

export default Currency;
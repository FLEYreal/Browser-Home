'use client'

// Basics
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Shadcn / Tailwind
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";

// Shared
import { useRates } from '@/shared/api/currency-api/use-currency';

// Insides
import { currencyType, currencies } from '../config/supported-currencies';
import { LoadIndicator } from '@/shared/ui/load-indicator';

export type selectedState = {
    from: currencyType['id'];
    to: currencyType['id'];
}

export default function ConverterContent() {

    // Get Currency rates from binance
    const { data: rates, isLoading } = useRates({ key: ['currency-rates'] });

    // Currently selected currencies to convert
    const [selected, setSelected] = useState<selectedState>({
        from: "RUB",
        to: "USD"
    });
    const [price, setPrice] = useState<string>('0');

    // Handlers
    const onValueChange = (
        value: currencyType['id'], // New value
        type: keyof selectedState // Type of selected state
    ) => {
        if (!rates) return; // It can only work in the case of rates being fully loaded

        // Update the state
        setSelected(prev => ({
            ...prev, // Spread the previous state
            [type]: value, // Update the specified field
        }));
    };

    useEffect(() => {
        if (rates) {
            const { from, to } = selected;
            const rate = rates.find(r => {
                return r.from === from && r.to === to;
            });

            if (rate && rate.price) setPrice(rate.price);
        }
    }, [selected.from, selected.to, rates]);

    return (
        <>

            <h2 className='mb-2 text-lg flex flex-row items-center gap-2'>
                {
                    isLoading ?
                        <>
                            <LoadIndicator />
                            Loading...
                        </> :
                        <>Currency Converter</>
                }
            </h2>
            <div className='flex flex-row gap-2'>
                <Input className='flex-8' placeholder="From" />
                <Select
                    defaultValue={selected.from}
                    onValueChange={(value) => onValueChange(value as currencyType['id'], 'from')}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="From" />
                    </SelectTrigger>
                    <SelectContent className='flex-2'>
                        {
                            currencies.map((currency, key) => {

                                return (
                                    <SelectItem value={currency.id} key={key}>
                                        <span className={currency.className}>{currency.label}</span>
                                        {currency.id}
                                    </SelectItem>
                                )
                            })
                        }
                    </SelectContent>
                </Select>

            </div>
            <div className='flex flex-row gap-2'>
                <Input className='flex-8' placeholder="To" />
                <Select
                    defaultValue={selected.to}
                    onValueChange={(value) => onValueChange(value as currencyType['id'], 'to')}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="To" />
                    </SelectTrigger>
                    <SelectContent className='flex-2'>
                        {
                            currencies.map((currency, key) => {

                                return (
                                    <SelectItem value={currency.id} key={key}>
                                        <span className={currency.className}>{currency.label}</span>
                                        {currency.id}
                                    </SelectItem>
                                )
                            })
                        }
                    </SelectContent>
                </Select>

            </div>
            <Button variant="link" className='text-sm p-0 w-24'>
                <Link href="https://www.google.com/search?q=currency+converter">
                    Just Google It
                </Link>
            </Button>

        </>
    )

}
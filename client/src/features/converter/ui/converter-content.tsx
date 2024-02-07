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
import { useRates } from '@/shared/api/currency-api';
import { LoadIndicator } from '@/shared/ui/load-indicator';

// Insides
import { currencyType, currencies } from '../config/supported-currencies';

export type selectedState = {
    from: currencyType['id'];
    to: currencyType['id'];
}

export default function ConverterContent() {

    // Get Currency rates
    const { data: rates, isLoading } = useRates({ key: ['currency-rates'] });

    // Currently selected currencies to convert
    const [selected, setSelected] = useState({ from: "usd", to: "rub" });

    // Values of the converted currnecies
    const [inputs, setInputs] = useState({
        from: '',
        to: ''
    });

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


    const onInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        direction: keyof selectedState // Direction of the input: from | to
    ) => {

        // New value
        const value = event.target.value;

        if (isNaN(Number(value)) || !rates) return;

        // Update the currencies' ratios
        if (direction === 'from') {
            setInputs(prev => {

                // Define new values, calculate new ratios for "newTo"
                const newFrom = String(value)
                const newTo =
                    (value === '' || Number(value) < 0.01) &&
                        (prev.from === '' || Number(prev.from) < 0.01) ? '' :
                        String((
                            (Number(value) /
                                (rates as { [key in currencyType['id']]: number })[selected.from as currencyType['id']]) *
                            (rates as { [key in currencyType['id']]: number })[selected.to as currencyType['id']]
                        ).toFixed(2))

                return {
                    from: newFrom,
                    to: newTo,
                }
            });
        }

        else if (direction === 'to') {
            setInputs(prev => {

                // Define new values, calculate new ratios for "newFrom"
                const newFrom =
                    (prev.to === '' || Number(prev.to) < 0.01) &&
                        (value === '' || Number(value) < 0.01) ? '' :
                        String((
                            (Number(value) /
                                (rates as { [key in currencyType['id']]: number })[selected.from as currencyType['id']]) /
                            (rates as { [key in currencyType['id']]: number })[selected.to as currencyType['id']]
                        ).toFixed(2))
                const newTo = String(value)

                return {
                    from: newFrom,
                    to: newTo
                }
            });
        }

    };


    useEffect(() => {

        // Clean up inputs on currencies change
        setInputs({ from: '', to: '' });

    }, [selected]);



    return (
        <>

            {/* Title */}
            <h2 className='mb-2 text-lg flex flex-row items-center gap-2'>
                {
                    // Show loading when query is loading and title when it's loaded
                    isLoading ?
                        <>
                            <LoadIndicator />
                            Loading...
                        </> :
                        <>Currency Converter</>
                }
            </h2>

            {/* Container for FROM input */}
            <div className='flex flex-row gap-2'>
                <Input value={inputs.from} onChange={(event) => onInputChange(event, 'from')} className='flex-8' placeholder="From" />
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
                                        {currency.id.toUpperCase()}
                                    </SelectItem>
                                )
                            })
                        }
                    </SelectContent>
                </Select>

            </div>

            {/* Container for TO input */}
            <div className='flex flex-row gap-2'>
                <Input value={inputs.to} onChange={(event) => onInputChange(event, 'to')} className='flex-8' placeholder="To" />
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
                                        {currency.id.toUpperCase()}
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
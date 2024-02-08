'use client'

// Basics
import Link from 'next/link';
import { useEffect, useReducer } from 'react';

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
import {
    useRates,
    useConvert,
    type supportedCurrencyType,
    supportedCurrencies
} from '@/shared/api/currency-api';

// Types & Interfaces
export type ConverterSample<T = string> = {
    from: T,
    to: T
}

export type StateType = {
    selected: ConverterSample<supportedCurrencyType['id']>,
    inputs: ConverterSample<string>
}

export type ActionType<T extends 'inputs' | 'selected' = 'inputs'> = {
    type: 'SET_SELECTED' | 'SET_INPUTS';
    payload:
    T extends 'selected' ? StateType['selected'] :
    T extends 'inputs' ? StateType['inputs'] :
    never
};

// Converter Integration, converts most of the neccessary currencies
export default function Converter() {

    // Get Currency rates
    const { data } = useRates()!;
    const rates = data as { [key in supportedCurrencyType['id']]: number }

    // Define reducer function
    const reducer = (state: StateType, action: ActionType): StateType => {

        switch (action.type) {
            case 'SET_SELECTED':
                return { ...state, selected: action.payload as ActionType<'selected'>['payload'] };
            case 'SET_INPUTS':
                return { ...state, inputs: action.payload };
            default:
                return state;
        }

    };

    // Initialize state using useReducer
    const initialState: StateType = {
        selected: { from: 'usd', to: 'rub' },
        inputs: { from: '', to: '' },
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    // Destructure state
    const { selected, inputs } = state;

    // Handlers
    const onValueChange = (value: string, type: 'from' | 'to') => {
        if (!rates) return;
        // Update the state
        dispatch({ type: 'SET_SELECTED', payload: { ...selected, [type]: value } });
    };


    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>, direction: 'from' | 'to') => {

        // New value
        const value = event.target.value;

        // Don't convert rates until it's a valid number
        if (Number.isNaN(Number(value)) || !rates) dispatch({
            type: 'SET_INPUTS',
            payload: { ...inputs, [direction]: value }
        });

        else if (Number(value) <= 0) dispatch({
            type: 'SET_INPUTS',
            payload: { from: '', to: '' }
        });

        else if (direction === 'from') {

            const result = useConvert(rates, selected.from, selected.to, Number(value));
            dispatch({ type: 'SET_INPUTS', payload: { from: value, to: String(result) } });

        }

        else if (direction === 'to') {

            const result = useConvert(rates, selected.to, selected.from, Number(value));
            dispatch({ type: 'SET_INPUTS', payload: { from: String(result), to: value } });

        }
    };



    useEffect(() => {
        // Clean up inputs on currencies change
        dispatch({ type: 'SET_INPUTS', payload: { from: '', to: '' } });
    }, [selected]);

    return (
        <>
            {/* Header section with title and loading indicator */}
            <h2 className="mb-2 text-lg flex flex-row items-center gap-2">

                <div className="flex flex-col">
                    Currency Converter
                    {
                        rates && (
                            <span className="text-sm">
                                1 {selected.from.toUpperCase()} equals{' '}
                                {useConvert(rates, selected.from, selected.to, 1)} {selected.to.toUpperCase()}
                            </span>
                        )
                    }
                </div>

            </h2>

            {/* Render input containers for 'from' and 'to' directions */}
            {(['from', 'to'] as const).map((direction) => (
                <div key={direction} className="flex flex-row gap-2">

                    {/* Input component for currency amount */}
                    <Input
                        value={inputs[direction]}
                        onChange={(event) => onInputChange(event, direction)}
                        className="flex-8"
                        placeholder={direction === 'from' ? 'From' : 'To'}
                    />

                    {/* Dropdown component for selecting currency */}
                    <Select
                        defaultValue={selected[direction]}
                        onValueChange={(value) => onValueChange(value, direction)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={direction === 'from' ? 'From' : 'To'} />
                        </SelectTrigger>

                        <SelectContent className="flex-2">
                            {/* Render the list of supported currencies in the dropdown */}
                            {supportedCurrencies.map((currency, key) => (
                                <SelectItem value={currency.id} key={key}>
                                    <span className={currency.className}>{currency.label}</span>
                                    {currency.id.toUpperCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            ))}

            {/* Button for external link to Google search */}
            <Button variant="link" className="text-sm p-0 w-24">
                <Link href={`https://www.google.com/search?q=${selected.from}+to+${selected.to}+exchange+rates`}>
                    Just Google It
                </Link>
            </Button>
        </>
    );

}
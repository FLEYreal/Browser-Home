'use client'

// Shadcn / Tailwind
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";

export default function Converter() {

    return (
        <Popover>
            <PopoverTrigger asChild>

                <Button variant="secondary">
                    Conventer
                </Button>

            </PopoverTrigger>

            <PopoverContent className='flex flex-col gap-4'>
                <h2>Currency Converter</h2>
                <div className='flex flex-row gap-2'>
                    <Input className='flex-8' placeholder="From" />
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="From" />
                        </SelectTrigger>
                        <SelectContent className='flex-2'>
                            <SelectItem value="USD"><span className='mr-[2px]'>🇺🇸</span> USD</SelectItem>
                            <SelectItem value="EUR"><span className='mr-[2px]'>🇪🇺</span> EUR</SelectItem>
                            <SelectItem value="RUB"><span className='mr-[2px]'>🇷🇺</span> RUB</SelectItem>
                            <SelectItem value="BUN"><span className='mr-[2px]'>🇧🇾</span> BUN</SelectItem>
                            <SelectItem value="UAH"><span className='mr-[2px]'>🇺🇦</span> UAH</SelectItem>
                            <SelectItem value="TRY"><span className='mr-[2px]'>🇹🇷</span> TRY</SelectItem>
                            <SelectItem value="BTC"><span className='text-yellow-500 mr-[9px]'>₿</span> BTC</SelectItem>
                            <SelectItem value="ETH"><span className='text-purple-500 mr-[9px]'>Ξ</span> ETH</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
                <div className='flex flex-row gap-2'>
                    <Input className='flex-8' placeholder="To" />
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="To" />
                        </SelectTrigger>
                        <SelectContent className='flex-2'>
                            <SelectItem value="USD"><span className='mr-[2px]'>🇺🇸</span> USD</SelectItem>
                            <SelectItem value="EUR"><span className='mr-[2px]'>🇪🇺</span> EUR</SelectItem>
                            <SelectItem value="RUB"><span className='mr-[2px]'>🇷🇺</span> RUB</SelectItem>
                            <SelectItem value="BUN"><span className='mr-[2px]'>🇧🇾</span> BUN</SelectItem>
                            <SelectItem value="UAH"><span className='mr-[2px]'>🇺🇦</span> UAH</SelectItem>
                            <SelectItem value="TRY"><span className='mr-[2px]'>🇹🇷</span> TRY</SelectItem>
                            <SelectItem value="BTC"><span className='text-yellow-500 mr-[9px]'>₿</span> BTC</SelectItem>
                            <SelectItem value="ETH"><span className='text-purple-500 mr-[9px]'>Ξ</span> ETH</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            </PopoverContent>
        </Popover>
    )

}
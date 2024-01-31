// Basics
import Link from 'next/link'
import Image from 'next/image'

// Shadcn / Tailwind
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Settings, SearchIcon } from 'lucide-react'

// Features
import { Currency } from '@/features/currency'

// Assets
import Google from '@/public/icons/Google.svg'
import Yandex from '@/public/icons/Yandex.svg'
import Bing from '@/public/icons/Bing.svg'
import { Switch } from '@/shared/ui/switch'

export default function Search() {

    return (
        <section>
            <div className='flex flex-row items-center justify-center gap-6'>
                <div className='flex-1 relative'>
                    <Input
                        placeholder='Search'
                        className='p-6 text-xl font-medium leading-normal h-16 rounded-lg'
                    />
                    <Button variant="ghost" size="icon" className='absolute right-4 h-10 w-10 top-3'>
                        <SearchIcon />
                    </Button>
                </div>
                <Button variant="ghost" size="icon">
                    <Settings size="28" />
                </Button>
            </div>
            <div className='flex flex-row items-center justify-between mt-3'>
                <div className='text-sm text-color-sm flex flex-row items-center justify-start gap-2'>
                    <h1 className='-mt-[2px]'>Search Engines:</h1>
                    <div className='w-4 h-4 flex items-center justify-center'>
                        <Link href="https://google.com/" target="_blank">
                            <Image src={Google} alt="Google" />
                        </Link>
                    </div>
                    <div className='w-4 h-4 flex items-center justify-center'>
                        <Link href="https://dzen.ru/" target="_blank">
                            <Image src={Yandex} alt="Yandex" />
                        </Link>
                    </div>
                    <div className='w-4 h-4 flex items-center justify-center'>
                        <Link href="https://bing.com/" target="_blank">
                            <Image src={Bing} alt="Bing" />
                        </Link>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-end gap-6'>
                    <div className='flex flex-row items-center justify-start gap-4'>
                        <h1 className='text-primary'>AI Integration:</h1>
                        <Switch color='text-color-sm' checked />
                    </div>
                    <Currency />
                </div>
            </div>
        </section>
    )
}
'use client'

// Basics
import Link from 'next/link'
import Image from 'next/image'

// Insides
import { useSearchContext, EngineState } from './provider'

// Assets
import Google from '@/public/icons/Google.svg'
import Yandex from '@/public/icons/Yandex.svg'
import Bing from '@/public/icons/Bing.svg'
import { useMemo } from 'react'

export default function UsedEngines() {

    // Get used engine list
    const { engines } = useSearchContext()

    // Engine data
    const engineData = useMemo(() => ({
        'google': {
            name: 'Google',
            url: 'https://www.google.com',
            icon: Google
        },
        'bing': {
            name: 'Bing',
            url: 'https://www.bing.com',
            icon: Bing
        },
        'yandex': {
            name: 'Yandex',
            url: 'https://dzen.ru',
            icon: Yandex
        }
    }), [])
    

    return (
        <div className='text-sm text-color-sm flex flex-row items-center justify-start gap-2'>
            <h1 className='-mt-[2px]'>Search Engines:</h1>
            {
                engines.map((item: EngineState, key) => {

                    return (
                        <div key={key} className='w-4 h-4 flex items-center justify-center'>
                            <Link href={engineData[item].url} target="_blank">
                                <Image src={engineData[item].icon} alt={item} title={item} />
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}
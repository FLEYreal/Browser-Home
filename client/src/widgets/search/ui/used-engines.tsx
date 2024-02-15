'use client'

// Basics
import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Shared
import { useSearchContext, EngineState } from '@/shared/utils/search-context';

// Assets
import Google from '@/public/icons/Google.svg'
import DuckDuckGo from '@/public/icons/DuckDuckGo.svg'
import Yandex from '@/public/icons/Yandex.svg'
import Bing from '@/public/icons/Bing.svg'
import YouTube from '@/public/icons/YouTube.svg'

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
        },
        'duckduckgo': {
            name: 'DuckDuckGo',
            url: 'https://duckduckgo.com',
            icon: DuckDuckGo
        },
        'youtube': {
            name: 'YouTube',
            url: 'https://youtube.com',
            icon: YouTube
        }
    }), [])


    return (
        <div className='text-sm text-color-sm flex flex-row items-center justify-start gap-2'>
            <h1 className='-mt-[2px]'>Search Engines:</h1>
            {
                engines && engines.length > 0 ? engines.map((item: EngineState, key) => {

                    return (
                        <div key={key} className='w-4 h-4 flex items-center justify-center'>
                            <Link href={engineData[item].url} target="_blank">
                                <Image src={engineData[item].icon} alt={item} title={item} />
                            </Link>
                        </div>
                    )
                }) : <p className='text-white'>{'None :)'}</p>
            }
        </div>
    )
}
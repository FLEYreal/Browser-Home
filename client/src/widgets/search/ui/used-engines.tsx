'use client'

// Basics
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Shared
import { useSearchContext, EngineEnum } from '@/shared/utils/search-context';

// Assets
import Google from '@/public/icons/Google.svg'
import DuckDuckGo from '@/public/icons/DuckDuckGo.svg'
import Yandex from '@/public/icons/Yandex.svg'
import Bing from '@/public/icons/Bing.svg'
import YouTube from '@/public/icons/YouTube.svg'

// Interfaces
type EngineData = {
    [key in number]: {
        name: string;
        url: string;
        icon: string | StaticImport
    }
}

export default function UsedEngines() {

    // Get used engine list
    const { engines } = useSearchContext()

    // Engine data
    const engineData: EngineData = useMemo(() => ({
        [EngineEnum.Google]: {
            name: 'Google',
            url: 'https://www.google.com',
            icon: Google
        },
        [EngineEnum.Bing]: {
            name: 'Bing',
            url: 'https://www.bing.com',
            icon: Bing
        },
        [EngineEnum.Yandex]: {
            name: 'Yandex',
            url: 'https://dzen.ru',
            icon: Yandex
        },
        [EngineEnum.DuckDuckGo]: {
            name: 'DuckDuckGo',
            url: 'https://duckduckgo.com',
            icon: DuckDuckGo
        },
        [EngineEnum.YouTube]: {
            name: 'YouTube',
            url: 'https://youtube.com',
            icon: YouTube
        }
    }), [])

    return (
        <div className='text-sm text-color-sm flex flex-row items-center justify-start gap-2'>
            <h1 className='-mt-[2px]'>Search Engines:</h1>
            {
                engines && engines.length > 0 ? engines.map((item: number, key) => {

                    return (
                        <div key={key} className='w-4 h-4 flex items-center justify-center'>
                            <Link href={engineData[item].url} target="_blank">
                                <Image src={engineData[item].icon} alt={engineData[item].name} title={engineData[item].name} />
                            </Link>
                        </div>
                    )
                }) : <p className='text-white'>{'None :)'}</p>
            }
        </div>
    )
}
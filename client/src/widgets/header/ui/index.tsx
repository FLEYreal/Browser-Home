// Basics
import Image from 'next/image'

// Features
import { DesignSwitch } from '@/features/design-switch'

// Styles
import '@/shared/css/global.scss'

// Assets
import Github from '@/public/icons/Github.svg'

export default function Header() {
    return (
        <header className='flex mt-11 items-center justify-between'>
            <div className='flex items-center'>
                <Image alt='Github' src={Github} width={43} height={43} />
                <div className='ml-2 text-gray-500'>
                    <div className='font-medium text-lg leading-tight text-white'>
                        Browser Home
                    </div>
                    <div>
                        by
                        <a href='https://github.com/FLEYreal'> FLEYreal</a> &{' '}
                        <a href='https://github.com/avariceJS'>AvariceJS</a>
                    </div>
                </div>
            </div>
            <div>
                <DesignSwitch />
            </div>
        </header>
    )
}
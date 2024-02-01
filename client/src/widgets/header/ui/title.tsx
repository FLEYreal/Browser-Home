// Basics
import Image from 'next/image'
import Link from 'next/link'

// Shadcn / Tailwind
import { Button } from '@/shared/ui/button'

// Assets
import Github from '@/public/icons/Github.svg'

export default function TitleContainer() {

    return (

        <div className='flex items-center'>

            {/* Github logo near project title */}
            <Image alt='Github' src={Github} width={43} height={43} />

            {/* Content */}
            <div className='ml-2 text-gray-500'>

                {/* Title of the project */}
                <div className='font-medium text-lg leading-tight text-white'>
                    Browser Home
                </div>

                {/* Description of the project (Who made it) */}
                <div>

                    by{' '}
                    <Button variant="link" className='p-0 m-0 px-1 h-auto'>
                        <Link target='_blank' href="https://github.com/FLEYreal">
                            FLEYreal
                        </Link>
                    </Button> &{' '}

                    <Button variant="link" className='p-0 m-0 px-1 h-auto'>
                        <Link target='_blank' href="https://github.com/avariceJS">
                            AvariceJS
                        </Link>
                    </Button>

                </div>

            </div>
        </div>

    )
}
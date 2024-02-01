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
            <Link target='_blank' href="https://github.com/FLEYreal/Browser-Home">
                <Image alt='Github' src={Github} width={46} height={46} />
            </Link>

            {/* Content */}
            <div className='ml-3 text-gray-500'>

                {/* Title of the project */}
                <Link target='_blank' href="https://github.com/FLEYreal/Browser-Home">
                    <Button variant="link" className='p-0 m-0 h-auto font-medium text-[20px] leading-tight'>
                        Browser Home
                    </Button>
                </Link>

                {/* Description of the project (Who made it) */}
                <div>

                    <span className='text-sm'>by</span>
                    <Link target='_blank' href="https://github.com/FLEYreal">
                        <Button variant="link" className='p-0 m-0 px-1 h-auto text-sm'>
                            FLEYreal
                        </Button>
                    </Link>

                </div>

            </div>
        </div>

    )
}
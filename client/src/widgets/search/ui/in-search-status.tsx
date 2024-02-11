'use client'

// Shared
import { useInSearchContext } from '@/shared/utils/in-search-context';

export default function InSearchStatus() {

    const { inSearchStatus } = useInSearchContext()

    return (
        <div className='text-sm text-color-sm flex flex-row items-center justify-start gap-2'>
            <h5 className='-mt-[2px]'>In-Search:</h5>
            <p className='text-primary opacity-60'>
                {inSearchStatus ? 'On' : 'Off'}
            </p>
        </div>
    )
}
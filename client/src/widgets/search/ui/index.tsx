// Features
import { Currency } from '@/features/currency'

// Insides
import SearchBar from './search-bar'
import UsedEngines from './used-engines'
import SearchProvider from './provider'
import SearchSettings from './settings'

// Assets
import InSearchStatus from './in-search-status'

export default function Search() {

    return (
        <section>
            <SearchProvider>
                <div className='flex flex-row items-center justify-center gap-6'>

                    <SearchBar />
                    <SearchSettings />

                </div>
                <div className='flex flex-row items-center justify-between mt-3'>
                    <div className='flex flex-row gap-5'>
                        <InSearchStatus />
                        <UsedEngines />
                    </div>
                    <div className='flex flex-row items-center justify-end gap-6'>
                        <Currency />
                    </div>
                </div>
            </SearchProvider>
        </section>
    )
}
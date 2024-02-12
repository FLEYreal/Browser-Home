// Features
import { Currency } from '@/features/currency'

// Insides
import SearchBar from './search-bar'
import UsedEngines from './used-engines'
import SearchProvider from './provider'
import SearchSettings from './settings'

export default function Search() {

    return (
        <section>
            <SearchProvider>
                <div className='flex flex-row items-center justify-center gap-6'>

                    <SearchBar />
                    <SearchSettings />

                </div>
                <div className='flex flex-row items-center justify-between mt-3'>
                    <UsedEngines />
                    <div className='flex flex-row items-center justify-end gap-6'>
                        <Currency />
                    </div>
                </div>
            </SearchProvider>
        </section>
    )
}
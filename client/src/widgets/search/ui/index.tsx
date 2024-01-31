// Shadcn / Tailwind
import { Button } from '@/shared/ui/button'
import { Settings } from 'lucide-react'

// Features
import { Currency } from '@/features/currency'

// Insides
import SearchBar from './search-bar'
import UsedEngines from './used-engines'
import SearchProvider from './provider'

// Assets
import { Switch } from '@/shared/ui/switch'

export default function Search() {

    return (
        <section>
            <SearchProvider>
                <div className='flex flex-row items-center justify-center gap-6'>

                    <SearchBar />

                    <Button variant="ghost" size="icon">
                        <Settings size="28" />
                    </Button>
                </div>
                <div className='flex flex-row items-center justify-between mt-3'>
                    <UsedEngines />
                    <div className='flex flex-row items-center justify-end gap-6'>
                        <div className='flex flex-row items-center justify-start gap-4'>
                            <h1 className='text-primary'>AI Integration:</h1>
                            <Switch color='text-color-sm' checked />
                        </div>
                        <Currency />
                    </div>
                </div>
            </SearchProvider>
        </section>
    )
}
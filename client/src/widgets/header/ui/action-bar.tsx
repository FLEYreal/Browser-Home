// Shadcn / Tailwind
import { Button } from '@/shared/ui/button'

// Features
import { DesignSwitch } from '@/features/design-switch'

export default function ActionBar() {

    return (
        <div className='flex gap-4'>
            <Button variant="secondary">New Shelf</Button>
            <DesignSwitch />
        </div>
    )
}
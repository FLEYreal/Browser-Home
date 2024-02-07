// Features
import { DesignSwitch } from '@/features/design-switch'
import { CreateShelfBtn } from '@/features/shelf'

export default function ActionBar() {

    return (
        <div className='flex gap-4'>
            <CreateShelfBtn />
            <DesignSwitch />
        </div>
    )
}
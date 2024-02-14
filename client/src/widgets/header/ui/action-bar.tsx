// Features
import { DesignSwitch } from '@/features/design-switch'
import { KeybindsMenu } from '@/features/keybinds-menu'
import { CreateShelfBtn } from '@/features/shelf'

export default function ActionBar() {

    return (
        <div className='flex gap-3'>
            <CreateShelfBtn />
            <KeybindsMenu />
            <DesignSwitch />
        </div>
    )
}
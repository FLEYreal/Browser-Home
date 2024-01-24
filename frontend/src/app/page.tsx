'use client'
import ModalContent from '@/features/item/ui/create-modal'
import { Button } from '@/shared/libs/ui/button'
import { Switch } from '@/shared/libs/ui/switch'

export default function Page() {
	return (
		<>
			<Button
				content='Successfully Created Shelf!'
				className='m-2'
				variant='successfully'
			/>

			<Button
				content='Information is the key!'
				className='m-2'
				variant='Information'
			/>
			<Button
				content='Warning! I smell something bad!'
				className='m-2'
				variant='Warning'
			/>
			<Button
				content='Error! Jerks aren’t allowed'
				className='m-2'
				variant='Error'
			/>

			<Button content='Upload Icon' className='m-2' variant='Uploaded' />
			<Button content='Update' className='m-2' variant='Update' />

			<ModalContent variant='CreateItem' />
			<ModalContent variant='UpdateItem' />
			<ModalContent variant='CreateShelf' />
			<ModalContent variant='UpdateShelf' />

			<Switch />
		</>
	)
}

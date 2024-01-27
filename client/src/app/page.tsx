'use client'
import ItemModal from '@/features/item/ui/create-modal'
import SearchBox from '@/features/search-box/ui/search-box'
import ShelfModal from '@/features/shelf/ui/create-modal'
import { Button } from '@/shared/libs/ui/button'
import { Switch } from '@/shared/libs/ui/switch'
import CurrencyComponent from '@/shared/ui/CurrencyComponent'

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

			<ItemModal variant='create' />
			<ItemModal variant='update' />

			<ShelfModal variant='create'></ShelfModal>
			<ShelfModal variant='update'></ShelfModal>
			<SearchBox></SearchBox>
		</>
	)
}

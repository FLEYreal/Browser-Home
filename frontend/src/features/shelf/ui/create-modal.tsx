'use client'
import { Button } from '@/shared/libs/ui/button'
import {
	Dialog,
	DialogOverlay,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from '@/shared/libs/ui/dialog'
import { Input } from '@/shared/libs/ui/input'

import { ChangeEvent, useState } from 'react'

interface ModalContentProps {
	variant: 'create' | 'update'
}

interface CommonState {
	title: string
	link?: string
	socialMedia: string
	description: string
}

export default function ShelfModal({ variant }: ModalContentProps) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className='bg-gray-700 rounded-lg m-1 text-white py-2 px-4'
			>
				{variant === 'create' ? '+ New Shelf' : 'UpdateShelf'}
			</button>

			<Dialog open={open} onOpenChange={newOpen => setOpen(newOpen)}>
				<DialogOverlay />
				<DialogContent>
					<DialogHeader
						className={
							variant === 'create'
								? 'text-Success items-center'
								: 'text-Update items-center'
						}
					>
						{variant === 'create' ? 'Create Shelf' : 'Update Shelf'}
						<DialogClose />
					</DialogHeader>
					<div className='space-y-4'>
						<Input placeholder='Title' />
						
						<textarea
							placeholder='Description'
							className='w-full p-2 border rounded-lg bg-inherit text-white'
							rows={4}
						/>

						<div className='flex flex-col space-y-2 text-center'>
							<div>
								<Button
									className='m-2'
									content={variant === 'create' ? 'Create' : 'Update'}
									variant={variant === 'create' ? 'successfully' : 'Update'}
								/>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

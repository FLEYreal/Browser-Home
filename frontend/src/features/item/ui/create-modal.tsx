'use client'
import { Button } from '@/shared/libs/ui/button'
import {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogClose,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
} from '@/shared/libs/ui/dialog'
import { Sailboat } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

interface ModalContentProps {
	variant: 'CreateShelf' | 'CreateItem' | 'UpdateShelf' | 'UpdateItem'
}

interface CommonState {
	title: string
	link: string
	socialMedia: string
	description: string
}

export default function ModalContent({ variant }: ModalContentProps) {
	const [open, setOpen] = useState(false)
	const [shelfTitle, setShelfTitle] = useState('')
	const [shelfDescription, setShelfDescription] = useState('')
	const [selectedColor, setSelectedColor] = useState('#000000')

	const commonState: CommonState = {
		title: '',
		link: '',
		socialMedia: '',
		description: '',
	}

	const [state, setState] = useState<CommonState>(commonState)

	const handleAction = () => {
		// Your logic to handle the action based on the variant goes here
		console.log(`Performing action for ${variant}:`, state)
		// Close the modal after performing the action
		setOpen(false)
	}

	const handleChange =
		(field: keyof CommonState) =>
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setState(prevState => ({ ...prevState, [field]: e.target.value }))
		}

	return (
		<>
			<button className='bg-gray-700 rounded-lg m-1 text-white py-2 px-4' onClick={() => setOpen(true)}> + New Shelf</button>

			<Dialog open={open} onOpenChange={newOpen => setOpen(newOpen)}>
				{/* Your modal content */}
				<DialogContent>
					<DialogHeader>
						<DialogTitle
							className={
								variant === 'CreateShelf' || variant === 'CreateItem'
									? 'text-Success'
									: 'text-Update'
							}
						>
							{variant === 'CreateItem'
								? 'Create Item'
								: variant === 'UpdateItem'
								? 'Update Item'
								: variant === 'CreateShelf'
								? 'Create Shelf'
								: variant === 'UpdateShelf'
								? 'Update Shelf'
								: ''}
						</DialogTitle>
						<DialogClose />
					</DialogHeader>
					<div className='space-y-4'>
						{/* Title Input */}
						<input
							placeholder='Title'
							id='title'
							type='text'
							value={state.title}
							onChange={handleChange('title')}
							className='w-full p-2 border text-white  rounded-lg bg-inherit'
						/>

						{/* Conditional Inputs based on variant */}
						{(variant === 'CreateItem' || variant === 'UpdateItem') && (
							<>
								<input
									placeholder='Link'
									id='link'
									type='text'
									value={state.link}
									onChange={handleChange('title')}
									className='w-full p-2 border rounded-lg bg-inherit text-white'
								/>
							</>
						)}

						{/* Common Social Media Input */}
						<input
							placeholder='Social Media'
							id='socialMedia'
							type='text'
							value={state.socialMedia}
							onChange={handleChange('title')}
							className='w-full p-2 border rounded-lg bg-inherit text-white'
						/>

						{/* Common Description Input */}
						<textarea
							placeholder='Description'
							id='description'
							value={state.description}
							onChange={handleChange('title')}
							className='w-full p-2 border rounded-lg bg-inherit text-white'
							rows={4}
						/>

						{/* Buttons */}
						<div className='flex flex-col space-y-2 text-center '>
							{variant === 'CreateItem' && (
								<div>
									<Button
										className='m-2'
										content='Upload Icon'
										variant='Information'
									/>
									<Button
										className='m-2'
										content='Create'
										variant='successfully'
									/>
								</div>
							)}
							{variant === 'UpdateItem' && (
								<div>
									<Button
										className='m-2'
										content='Uploaded'
										variant='Uploaded'
									/>
									<Button className='m-2' content='Update' variant='Update' />
								</div>
							)}
							{(variant === 'CreateShelf' || variant === 'UpdateShelf') && (
								<div>
									{variant === 'CreateShelf' ? (
										<Button
											className='m-2'
											content='Create'
											variant='successfully'
										/>
									) : (
										<Button className='m-2' content='Update' variant='Update' />
									)}
								</div>
							)}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

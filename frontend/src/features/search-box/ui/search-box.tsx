'use client'

import { Input } from '@/shared/libs/ui/input'
import Image from 'next/image'
import Google from '@/public/icons/Google.svg'
import Yandex from '@/public/icons/Yandex.svg'
import Bing from '@/public/icons/Bing.svg'
import { Switch } from '@/shared/libs/ui/switch'
import CurrencyComponent from '@/shared/ui/CurrencyComponent'

export default function SearchBox() {
	return (
		<>
			<Input
				placeholder='Search'
				className='p-6 text-xl font-medium leading-normal w-[850px] h-[65px] flex-shrink-0 rounded-lg'
			/>

			<div className='flex mt-4 items-center text-gray-500 justify-around'>
				<div className='flex items-center'>
					<div className='text-lg'>Search Engines:</div>
					<a className='ml-2' href='https://github.com/FLEYreal'>
						<Image alt='Google' src={Google} width={20} height={20} />
					</a>
					<a className='ml-2' href='https://github.com/avariceJS'>
						<Image alt='Yandex' src={Yandex} width={20} height={20} />
					</a>
					<a className='ml-2' href='https://github.com/FLEYreal'>
						<Image alt='Bing' src={Bing} width={18} height={18} />
					</a>
				</div>

				<div className='flex'>
					<div className='mr-3 text-Success'>
						<span>AI Integration</span>
					</div>
					<div className='mr-8'>
						<Switch />
					</div>
					<div>
						<CurrencyComponent />
					</div>
				</div>
			</div>
		</>
	)
}

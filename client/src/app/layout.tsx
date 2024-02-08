// Basics
import { ReactNode } from 'react'

// Shared
import { Toaster } from '@/shared/ui/toaster'

// Styles
import '@/shared/css/global.scss'
import Providers from './providers'

export const metadata = {
	title: 'Browser-Home',
	description: 'Convenient Home Page for Browsers by FLEY and AvariceJS',
}

function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' className='dark' suppressHydrationWarning>

			<Providers>

				{children}

				{/* Display Notifications */}
				<Toaster />

			</Providers>


		</html>
	)
}

export default RootLayout
// Basics
import React, { ReactNode } from 'react';

// Shared
import { Toaster } from '@/shared/ui/toaster'

// Styles
import '@/shared/css/global.scss'
import Providers from './providers'

export const metadata = {
	title: 'Browser-Home',
	description: 'Convenient Home Page for Browsers by FLEYreal',
}

function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' className='dark' suppressHydrationWarning>
			<body>

				<Providers>

					{children}

					{/* Display Notifications */}
					<Toaster />

				</Providers>

			</body>
		</html>
	)
}

export default RootLayout
// Basics
import { ReactNode } from 'react'

// Shared
import QueryClientProvider from '@/shared/libs/react-query/provider'
import { Toaster } from '@/shared/ui/toaster'

// Styles
import '@/shared/css/global.scss'

// Assets
import DesignProvider from '@/shared/libs/shadcn/design-provider'

export const metadata = {
	title: 'Browser-Home',
	description: 'Convenient Home Page for Browsers by FLEY and AvariceJS',
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' className='dark' suppressHydrationWarning>
			<DesignProvider className='bg-background'>
				<QueryClientProvider>

					{children}

					{/* Display Notifications */}
					<Toaster />

				</QueryClientProvider>
			</DesignProvider>
		</html>
	)
}

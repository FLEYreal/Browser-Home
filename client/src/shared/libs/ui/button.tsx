import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonColors = {
	successfully: 'bg-Success text-black',
	Information: 'bg-Info text-black',
	Warning: 'bg-Warning text-black',
	Error: 'bg-Error text-white',
	Update: 'bg-Update text-black',
	Uploaded: 'bg-Uploaded text-white',
}

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				successfully: `${buttonColors.successfully} hover:bg-yellow-400`,
				Information: `${buttonColors.Information} hover:bg-blue-400`,
				Warning: `${buttonColors.Warning} hover:bg-orange-400`,
				Error: `${buttonColors.Error} hover:bg-red-400`,
				Update: `${buttonColors.Update} hover:bg-red-400`,
				Uploaded: `${buttonColors.Uploaded} hover:bg-red-400`,
			},
			size: {
				default: 'w-[450px] h-10 rounded-lg',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'successfully', // Default variant
			size: 'default',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, content, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				{content}
			</Comp>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }

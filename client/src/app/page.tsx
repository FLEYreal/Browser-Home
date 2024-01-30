import { DesignSwitch } from "@/features/design-switch";
import { Button } from "@/shared/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/ui/card"

export default function Home() {
	return (
		<>

			<h1>Modals & Actions</h1>
			<h2 className="text-xl">Text XL</h2>
			<h2 className="text-lg">Text LG</h2>
			<h2 className="text-sm">Text SM</h2>
			<h2 className="text-xs">Text XS</h2>
			<DesignSwitch />

			<Card>
				<CardHeader>
                    <CardTitle>Card Title</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </CardDescription>
                </CardContent>
                <CardFooter>
                    <Button variant='outline'>Action</Button>
                </CardFooter>
			</Card>
		</>
	)
}

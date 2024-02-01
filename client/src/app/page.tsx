// Widgets
import { Header } from "@/widgets/header";
import { Search } from "@/widgets/search";
import { Intergrations } from "@/widgets/integrations";

import { Item } from "@/features/item";

export default function Home() {
	return (
		<main className="max-w-4xl mx-auto">
			<Header />
			<Search />
			<Intergrations />
			<Item title="Discord" link="https://discord.gg"/>
		</main>
	)
}

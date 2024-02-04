// Widgets
import { Header } from "@/widgets/header";
import { Search } from "@/widgets/search";
import { Intergrations } from "@/widgets/integrations";
import { Shelves } from "@/widgets/shelves";

export default function Home() {
	return (
		<main className="max-w-4xl mx-auto">
			<Header />
			<Search />
			<Intergrations />
			<Shelves className="mt-8 text-xl" />
		</main>
	)
}

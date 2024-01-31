// Widgets
import { Header } from "@/widgets/header";
import { Search } from "@/widgets/search";
import { Intergrations } from "@/widgets/integrations";

export default function Home() {
	return (
		<main className="max-w-4xl mx-auto">
			<Header />
			<Search />
			<Intergrations />
		</main>
	)
}

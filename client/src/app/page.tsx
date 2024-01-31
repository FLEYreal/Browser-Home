// Widgets
import { Header } from "@/widgets/header";
import { Search } from "@/widgets/search";

export default function Home() {
	return (
		<main className="max-w-4xl mx-auto">
			<Header />
			<Search />
		</main>
	)
}

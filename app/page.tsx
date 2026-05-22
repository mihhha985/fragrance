import { Hero } from "@/components/Hero";
import { ScrollText } from "@/components/ScrollText";
import { ProductFutures } from "@/components/ProductFutures";
import { FragranceList } from "@/components/FragranceList";
import { CallToAction } from "@/components/CallToAction";
import { Video } from "@/components/Video";

export default function Home() {
	return (
		<>
			<Hero />
			<ScrollText />
			<ProductFutures />
			<FragranceList />
			<CallToAction />
			<Video />
		</>
	);
}

import type { Metadata } from "next";
import { Bounded } from "@/components/Bounded";
import Quiz from "@/components/Quiz";

export const metadata: Metadata = {
	title: "Cote Royale Fragrance Finder",
	description:
		"Discover the fragrance crafted for you. Take our short quiz to uncover which Côte Royale scent aligns with your character, energy, and the impression you want to leave behind.",
	openGraph: {
		images: ["/aqua-og-image.png"],
	},
};

function page() {
	return (
		<Bounded
			as="section"
			className="grid min-h-screen place-items-center bg-[url('/background.avif')] bg-cover bg-center bg-no-repeat text-gray-50"
		>
			<Quiz />
		</Bounded>
	);
}

export default page;

import { getTranslator, isLocale } from "@/utils/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Bounded } from "@/components/Bounded";
import Quiz from "@/components/Quiz";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	const t = getTranslator(lang);
	return {
		title: t("Cote Royale Fragrance Finder"),
		description: t(
			"Discover the fragrance crafted for you. Take our short quiz to uncover which Côte Royale scent aligns with your character, energy, and the impression you want to leave behind.",
		),
		openGraph: {
			images: ["/aqua-og-image.png"],
		},
	};
}

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

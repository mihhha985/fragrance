import { isLocale } from "@/utils/i18n";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { ScrollText } from "@/components/ScrollText";
import { ProductFutures } from "@/components/ProductFutures";
import { FragranceList } from "@/components/FragranceList";
import { CallToAction } from "@/components/CallToAction";
import { Video } from "@/components/Video";

export default async function Home({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang: locale } = await params;
	if (!isLocale(locale)) notFound();
	return (
		<>
			<Hero locale={locale} />
			<ScrollText />
			<ProductFutures locale={locale} />
			<FragranceList locale={locale} />
			<CallToAction locale={locale} />
			<Video locale={locale} />
		</>
	);
}

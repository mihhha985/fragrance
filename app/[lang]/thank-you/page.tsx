import { getTranslator, isLocale } from "@/utils/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Bounded } from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	const t = getTranslator(lang);
	return {
		title: t("Thank you | Côte Royale"),
		robots: { index: false, follow: false },
	};
}

export default async function ThankYouPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	const t = getTranslator(lang);
	return (
		<Bounded className="glow-background flex min-h-[75vh] items-center py-24 text-center">
			<p className="mb-6 text-sm tracking-[0.2em] text-gray-300 uppercase">
				{t("Côte Royale · Order complete")}
			</p>
			<h1 className="mb-8 text-5xl md:text-7xl">
				{t("Thank you for your purchase")}
			</h1>
			<p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-300">
				{t(
					"Your demo checkout is complete. No payment has been taken, no delivery will be arranged and no notifications will be sent.",
				)}
			</p>
			<ButtonLink href="/" className="mx-auto">
				{t("Continue exploring")}
			</ButtonLink>
		</Bounded>
	);
}

import { getTranslator, isLocale } from "@/utils/i18n";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
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
	const orderId = (await cookies()).get("order_receipt")?.value;

	return (
		<Bounded className="glow-background flex min-h-[75vh] items-center py-24 text-center">
			<p className="mb-6 text-sm tracking-[0.2em] text-gray-300 uppercase">
				{t("Côte Royale · Order complete")}
			</p>
			<h1 className="mb-8 text-5xl md:text-7xl">
				{t("Thank you for your purchase")}
			</h1>
			<p className="mx-auto mb-4 max-w-xl text-lg leading-relaxed text-gray-300">
				{t(
					"Your order has been received and recorded for processing. No automatic notification will be sent.",
				)}
			</p>
			{orderId && (
				<p className="mx-auto mb-10 text-sm text-gray-400">
					{t("Order number")}: {orderId}
				</p>
			)}
			<ButtonLink href="/" className={orderId ? "mx-auto" : "mx-auto mt-10"}>
				{t("Continue exploring")}
			</ButtonLink>
		</Bounded>
	);
}

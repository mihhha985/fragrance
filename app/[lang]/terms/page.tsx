import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getTranslator, isLocale } from "@/utils/i18n";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	const t = getTranslator(lang);
	return {
		title: t("Terms of Use | Côte Royale"),
		description: t("Terms for using the Côte Royale website."),
	};
}

export default async function TermsPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	const t = getTranslator(lang);
	return (
		<LegalPage
			eyebrow={t("Legal")}
			title={t("Terms & conditions")}
			intro={t(
				"These terms govern your use of the Côte Royale website and its demo shopping experience.",
			)}
			updated={t("Last updated: September 10, 2026")}
			sections={[
				{
					title: t("Using this website"),
					paragraphs: [
						t(
							"You may use this website for personal, lawful purposes. Do not interfere with its operation, attempt unauthorized access or use its content in a misleading way.",
						),
					],
				},
				{
					title: t("Demo orders"),
					paragraphs: [
						t(
							"The checkout experience is a demonstration. No payment is taken, no order is fulfilled and no delivery or notification is arranged.",
						),
					],
				},
				{
					title: t("Content and intellectual property"),
					paragraphs: [
						t(
							"The Côte Royale name, visual identity, text, images and other site content are protected by applicable intellectual property laws. They may not be copied or reused without permission.",
						),
					],
				},
				{
					title: t("Changes and contact"),
					paragraphs: [
						t(
							"We may update these terms when the website changes. Continued use after an update means that you accept the revised terms.",
						),
						t(
							"For questions about these terms, contact Côte Royale using the details published by the brand.",
						),
					],
				},
			]}
		/>
	);
}

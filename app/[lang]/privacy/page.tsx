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
		title: t("Privacy Policy | Côte Royale"),
		description: t(
			"Learn how Côte Royale handles information on this website.",
		),
	};
}

export default async function PrivacyPage({
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
			title={t("Privacy Policy")}
			intro={t(
				"This policy explains what information may be processed when you use the Côte Royale website.",
			)}
			updated={t("Last updated: September 16, 2026")}
			sections={[
				{
					title: t("Information we collect"),
					paragraphs: [
						t(
							"We collect the information you provide during checkout, including your contact and delivery details and the contents of your order.",
						),
						t(
							"We may also receive basic technical information, including browser type, device information and pages visited, to keep the website reliable and secure.",
						),
					],
				},
				{
					title: t("How we use information"),
					paragraphs: [
						t(
							"Information is used to process orders, arrange delivery, respond to requests, operate and improve the website, and protect the service from misuse.",
						),
						t(
							"Checkout details are stored on the order server. They are not sent to a payment provider, and no automatic notification is sent.",
						),
					],
				},
				{
					title: t("Cookies"),
					paragraphs: [
						t(
							"We use a cookie to remember your language preference. You can manage or delete cookies through your browser settings.",
						),
					],
				},
				{
					title: t("Your choices"),
					paragraphs: [
						t(
							"You may request access to, correction of or deletion of personal information that you have provided. Contact us using the details published by Côte Royale.",
						),
					],
				},
			]}
		/>
	);
}

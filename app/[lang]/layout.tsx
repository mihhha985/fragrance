import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ViewTransitions } from "next-view-transitions";
import "../globals.css";
import { notFound } from "next/navigation";
import { getTranslator, isLocale, locales } from "@/utils/i18n";
import { LocaleProvider } from "@/components/LocaleProvider";

const raleway = Raleway({
	variable: "--font-raleway",
	subsets: ["latin", "cyrillic"],
	display: "swap",
});

const gambarino = localFont({
	variable: "--font-gambarino",
	src: "../../fonts/Gambarino-Regular.woff2",
	display: "swap",
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	const t = getTranslator(lang);
	return {
		title: "Cote Royale",
		description: t(
			"Discover Cote Royale: refined fragrances inspired by earth, fire and water.",
		),
		icons: {
			icon: "/icon.svg",
		},
		openGraph: {
			images: ["/cote-royale-og-image.png"],
		},
	};
}

export function generateStaticParams() {
	return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}>) {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	return (
		<ViewTransitions>
			<html
				lang={lang}
				className={`${raleway.variable} ${gambarino.variable} h-full antialiased`}
			>
				<body>
					<LocaleProvider locale={lang}>
						<NavBar />
						<main className="pt-14 md:pt-18">{children}</main>
						<Footer locale={lang} />
					</LocaleProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}

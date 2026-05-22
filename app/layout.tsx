import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

const raleway = Raleway({
	variable: "--font-raleway",
	subsets: ["latin"],
	display: "swap",
});

const gambarino = localFont({
	variable: "--font-gambarino",
	src: "../fonts/Gambarino-Regular.woff2",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Cote Royale",
	description: "Cote Royale is a premiup porfume brand fo",
	icons: {
		icon: "/icon.svg",
	},
	openGraph: {
		images: ["/cote-royale-og-image.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html
				lang="en"
				className={`${raleway.variable} ${gambarino.variable} h-full antialiased`}
			>
				<body>
					<NavBar />
					<main className="pt-14 md:pt-18">{children}</main>
					<Footer />
				</body>
			</html>
		</ViewTransitions>
	);
}

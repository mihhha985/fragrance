import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bounded } from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";
import { EditorialHero } from "@/components/EditorialHero";
import { FadeIn } from "@/components/FadeIn";
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
		title: t("Our Story | Côte Royale"),
		description: t(
			"Discover the values, landscapes and quiet confidence behind Côte Royale.",
		),
	};
}

export default async function OurStoryPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	const t = getTranslator(lang);

	const principles = [
		{
			number: "01",
			title: t("Nature, distilled"),
			text: t(
				"Earth after rain, embers at dusk, salt carried by wind—each fragrance begins with a real atmosphere.",
			),
		},
		{
			number: "02",
			title: t("Restraint, refined"),
			text: t(
				"We remove until only the essential remains. Every note has a purpose; every detail has room to breathe.",
			),
		},
		{
			number: "03",
			title: t("Character, revealed"),
			text: t(
				"Our fragrances do not perform for the room. They stay close, evolve slowly and become part of the person wearing them.",
			),
		},
	];

	return (
		<>
			<EditorialHero
				eyebrow={t("Maison Côte Royale")}
				title={t("Quiet confidence, bottled")}
				intro={t(
					"Côte Royale was created around a simple belief: true presence never needs to announce itself.",
				)}
				image="/our-story.png"
				imageAlt={t(
					"Sunlit French perfume atelier with an oak workbench and fragrance materials",
				)}
				align="right"
			/>

			<Bounded className="bg-neutral-950 py-20 md:py-28">
				<div className="grid gap-12 md:grid-cols-2 md:gap-24">
					<FadeIn>
						<p className="mb-5 text-sm tracking-[0.22em] text-gray-400 uppercase">
							{t("Our beginning")}
						</p>
						<h2 className="text-4xl leading-tight md:text-6xl">
							{t("Luxury without noise")}
						</h2>
					</FadeIn>
					<FadeIn className="space-y-6 text-lg leading-8 text-gray-300">
						<p>
							{t(
								"The idea began with landscapes that leave an impression without asking for attention: wet cedar, mineral coastlines and the glow of wood after flame.",
							)}
						</p>
						<p>
							{t(
								"We translated those moments into a wardrobe of fragrances for modern life. Each composition is direct but never obvious, refined but never distant.",
							)}
						</p>
					</FadeIn>
				</div>
			</Bounded>

			<Bounded className="glow-background py-20 md:py-28">
				<FadeIn className="mb-14 max-w-2xl md:mb-20">
					<p className="mb-5 text-sm tracking-[0.22em] text-gray-400 uppercase">
						{t("What guides us")}
					</p>
					<h2 className="text-4xl leading-tight md:text-6xl">
						{t("Made with intention")}
					</h2>
				</FadeIn>
				<div className="grid gap-px bg-white/10 md:grid-cols-3">
					{principles.map((item) => (
						<FadeIn key={item.number} className="h-full bg-neutral-950">
							<article className="flex h-full min-h-80 flex-col p-7 md:p-9">
								<p className="text-sm tracking-[0.2em] text-gray-500">
									{item.number}
								</p>
								<div className="mt-auto pt-16">
									<h3 className="mb-4 text-3xl">{item.title}</h3>
									<p className="leading-7 text-gray-400">{item.text}</p>
								</div>
							</article>
						</FadeIn>
					))}
				</div>
			</Bounded>

			<Bounded className="bg-black py-20 md:py-28">
				<FadeIn className="grid items-end gap-10 md:grid-cols-[1fr_auto] md:gap-20">
					<div className="max-w-3xl">
						<p className="mb-6 text-sm tracking-[0.22em] text-gray-500 uppercase">
							Côte Royale
						</p>
						<p className="font-display text-4xl leading-tight md:text-6xl">
							{t("Not a mask. A signature.")}
						</p>
					</div>
					<ButtonLink href="/">{t("Explore the collection")}</ButtonLink>
				</FadeIn>
			</Bounded>
		</>
	);
}

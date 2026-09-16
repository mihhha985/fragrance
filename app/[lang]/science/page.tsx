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
		title: t("The Science of Scent | Côte Royale"),
		description: t(
			"Discover how Côte Royale builds fragrance through contrast, proportion and time.",
		),
	};
}

export default async function SciencePage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	const t = getTranslator(lang);

	const movements = [
		{
			number: "01",
			title: t("Opening"),
			text: t(
				"The first impression arrives in seconds: bright citrus, aromatic herbs and cool mineral notes create clarity and direction.",
			),
		},
		{
			number: "02",
			title: t("Heart"),
			text: t(
				"As the fragrance settles, spices, flowers and textured woods reveal its character and hold the composition together.",
			),
		},
		{
			number: "03",
			title: t("Base"),
			text: t(
				"Resins, amber and deep woods remain closest to the skin, giving the scent warmth, depth and a lasting signature.",
			),
		},
	];

	const process = [
		{
			title: t("Source"),
			text: t(
				"We begin with materials chosen for texture and clarity—not rarity alone. Each ingredient must earn its place in the formula.",
			),
		},
		{
			title: t("Compose"),
			text: t(
				"Natural extracts and modern aroma molecules are balanced in precise proportions, creating effects nature cannot achieve by itself.",
			),
		},
		{
			title: t("Refine"),
			text: t(
				"The formula rests, is tested on skin and adjusted repeatedly. Time reveals whether every note moves as one.",
			),
		},
	];

	return (
		<>
			<EditorialHero
				eyebrow={t("Inside the formula")}
				title={t("The architecture of scent")}
				intro={t(
					"A fragrance is more than a list of notes. It is a structure designed to unfold on skin—measured in contrast, proportion and time.",
				)}
				image="/science-of-scent.png"
				imageAlt={t(
					"Perfumer's laboratory with glass vessels, scent strips and botanical materials",
				)}
			/>

			<Bounded className="bg-neutral-950 py-20 md:py-28">
				<FadeIn>
					<div className="grid gap-10 border-b border-white/10 pb-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:pb-20">
						<h2 className="text-4xl leading-tight md:text-6xl">
							{t("Built in three movements")}
						</h2>
						<p className="max-w-2xl text-lg leading-8 text-gray-300">
							{t(
								"Perfumery is experienced in sequence. Volatile materials rise first; slower, heavier molecules emerge later. The result is not a fixed smell, but a composition that changes with air, warmth and the wearer.",
							)}
						</p>
					</div>
				</FadeIn>

				<div className="grid md:grid-cols-3">
					{movements.map((item) => (
						<FadeIn key={item.number} className="h-full">
							<article className="h-full border-b border-white/10 py-10 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
								<p className="mb-16 text-sm tracking-[0.2em] text-gray-500">
									{item.number}
								</p>
								<h3 className="mb-4 text-3xl">{item.title}</h3>
								<p className="leading-7 text-gray-400">{item.text}</p>
							</article>
						</FadeIn>
					))}
				</div>
			</Bounded>

			<Bounded className="glow-background py-20 md:py-28">
				<div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
					<FadeIn>
						<p className="mb-5 text-sm tracking-[0.22em] text-gray-400 uppercase">
							{t("The making")}
						</p>
						<h2 className="text-4xl leading-tight md:text-6xl">
							{t("From material to memory")}
						</h2>
					</FadeIn>
					<div>
						{process.map((item, index) => (
							<FadeIn key={item.title}>
								<article className="grid gap-4 border-t border-white/15 py-8 sm:grid-cols-[3rem_1fr]">
									<p className="text-sm text-gray-500">0{index + 1}</p>
									<div>
										<h3 className="mb-3 text-2xl">{item.title}</h3>
										<p className="max-w-xl leading-7 text-gray-300">
											{item.text}
										</p>
									</div>
								</article>
							</FadeIn>
						))}
					</div>
				</div>
			</Bounded>

			<Bounded className="bg-black py-20 text-center md:py-28">
				<FadeIn className="mx-auto max-w-3xl">
					<p className="font-display text-3xl leading-tight md:text-5xl">
						{t(
							"The finest formula is the one you stop noticing—and start remembering.",
						)}
					</p>
					<div className="mt-10 flex justify-center">
						<ButtonLink href="/quiz">{t("Find your fragrance")}</ButtonLink>
					</div>
				</FadeIn>
			</Bounded>
		</>
	);
}

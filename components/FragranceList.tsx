import { getTranslator, type LocaleProps } from "@/utils/i18n";
import { Bounded } from "./Bounded";
import { FragranceDisplay } from "./FragranceDisplay";
import RevealText from "./RevealText";

function FragranceList({ locale }: LocaleProps) {
	const t = getTranslator(locale);
	return (
		<Bounded className="space-y-8 bg-black py-16 text-center text-white md:py-24">
			<p className="text-sm font-light tracking-[0.2em] uppercase">
				{t("Our Fragrances")}
			</p>
			<RevealText
				align="center"
				duration={1.7}
				staggerAmount={0.3}
				as="h2"
				field={t("An Essence for Every Man").split(" ")}
				id="fragrance-list-title"
				className="text-5xl uppercase sm:text-6xl md:text-7xl lg:text-8xl"
			/>
			<div className="mx-auto mb-10 max-w-2xl text-lg text-balance text-gray-300">
				<p>
					{t(
						"An expression of quiet luxury, Côte Royale is designed for the man who commands attention without seeking it.",
					)}
				</p>
			</div>
			<FragranceDisplay locale={locale} />
		</Bounded>
	);
}

export { FragranceList };

import ru from "@/data/ru.json";

export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];
export type LocaleProps = { locale: Locale };
export function isLocale(value: string): value is Locale {
	return locales.some((locale) => locale === value);
}

// English copy is the dictionary key; normalizing whitespace keeps multiline JSX readable.
export function getTranslator(locale: Locale) {
	return (text: string) => {
		const key = text.replace(/\s+/g, " ").trim();
		return locale === "ru"
			? ((ru as Record<string, string>)[key] ?? text)
			: text;
	};
}

export function localizedPath(href: string, locale: Locale) {
	if (!href.startsWith("/") || href.startsWith("//")) return href;
	const path = href.replace(/^\/(en|ru)(?=\/|\?|#|$)/, "");
	return `/${locale}${path === "/" ? "" : path}`;
}

export function preferredLocale(header: string | null): Locale {
	const preferences = (header ?? "")
		.split(",")
		.map((entry) => {
			const [tag, ...parameters] = entry.trim().split(";");
			const quality = parameters.find((parameter) =>
				parameter.trim().startsWith("q="),
			);
			return {
				lang: tag.toLowerCase().split("-")[0],
				quality: quality ? Number(quality.trim().slice(2)) : 1,
			};
		})
		.filter((entry) => entry.quality > 0 && entry.quality <= 1)
		.sort((a, b) => b.quality - a.quality);
	return (
		(preferences.find((entry) => isLocale(entry.lang))?.lang as Locale) ?? "en"
	);
}

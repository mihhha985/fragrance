import type { Locale } from "./i18n";

const RUBLES_PER_DOLLAR = 85;

export const priceForLocale = (price: number, locale: Locale): number =>
	locale === "ru" ? price * RUBLES_PER_DOLLAR : price;

export const formatPrice = (
	price: number | null | undefined,
	locale: Locale = "en",
): string =>
	Intl.NumberFormat(locale === "ru" ? "ru-RU" : "en-US", {
		style: "currency",
		currency: locale === "ru" ? "RUB" : "USD",
		minimumFractionDigits: 0,
	}).format(priceForLocale(price ?? 0, locale) / 100);

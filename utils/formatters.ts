import type { Locale } from "./i18n";

export const formatPrice = (
	price: number | null | undefined,
	locale: Locale = "en",
): string =>
	Intl.NumberFormat(locale === "ru" ? "ru-RU" : "en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
	}).format((price ?? 0) / 100);

"use client";

import { createContext, useContext } from "react";
import { getTranslator, type Locale } from "@/utils/i18n";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({
	locale,
	children,
}: {
	locale: Locale;
	children: React.ReactNode;
}) {
	return (
		<LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
	);
}

export function useI18n() {
	const locale = useContext(LocaleContext);
	return { locale, t: getTranslator(locale) };
}

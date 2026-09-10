import { NextResponse, type NextRequest } from "next/server";
import { isLocale, preferredLocale } from "@/utils/i18n";

export function proxy(request: NextRequest) {
	const segment = request.nextUrl.pathname.split("/")[1];
	if (isLocale(segment)) return NextResponse.next();
	const saved = request.cookies.get("locale")?.value;
	const locale =
		saved && isLocale(saved)
			? saved
			: preferredLocale(request.headers.get("accept-language"));
	const url = request.nextUrl.clone();
	url.pathname = `/${locale}${url.pathname === "/" ? "" : url.pathname}`;
	return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };

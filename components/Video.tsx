import { getTranslator, type LocaleProps } from "@/utils/i18n";
import { Lazy } from "./Lazy";

function Video({ locale }: LocaleProps) {
	const t = getTranslator(locale);
	return (
		<section className="bg-black">
			<h2 className="sr-only">{t("Côte Royale Video Reel")}</h2>
			<Lazy
				rootMargin="1500px"
				className="relative h-screen overflow-hidden md:aspect-video md:h-auto"
			>
				<video
					title={t("Côte Royale Video Reel")}
					src="/cote-royale-reel.mp4"
					autoPlay
					muted
					loop
					playsInline
					preload="metadata"
					className="pointer-events-none absolute left-1/2 aspect-video h-full max-w-none -translate-x-1/2"
				/>
			</Lazy>
		</section>
	);
}

export { Video };

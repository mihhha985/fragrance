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
				<iframe
					title={t("Côte Royale Video Reel")}
					src={`https://www.youtube-nocookie.com/embed/eTEsWseiDdg?autoplay=1&mute=1&loop=1&playlist=eTEsWseiDdg`}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					className="pointer-events-none absolute left-1/2 aspect-video h-full -translate-x-1/2"
				/>
			</Lazy>
		</section>
	);
}

export { Video };

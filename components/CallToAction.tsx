import { Bounded } from "./Bounded";
import { FadeIn } from "./FadeIn";
import RevealText from "./RevealText";
import { ButtonLink } from "./ButtonLink";

function CallToAction() {
	return (
		<Bounded
			as="section"
			className={
				"relative overflow-hidden bg-[url('/background.avif')] bg-cover bg-center" +
				"flex flex-col items-center justify-center py-16 text-gray-50 md:py-28"
			}
		>
			<div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
				<FadeIn
					className="translate-y-2 text-sm font-light tracking-[.2em] uppercase"
					vars={{ opacity: 1, duration: 0.8, delay: 0.4 }}
				>
					Fragrance Quiz
				</FadeIn>
				<RevealText
					id="call-to-action-title"
					field={["The", "Cote Royale", "Fragrance", "Finder"]}
					duration={0.8}
					align="center"
					staggerAmount={0.1}
					as="h2"
					className="mx-auto max-w-3xl text-5xl sm:text-6xl md:text-7xl"
				/>
				<FadeIn
					className="mx-auto max-w-2xl translate-y-2 text-lg text-balance text-gray-300"
					vars={{ opacity: 1, duration: 0.8, delay: 0.4 }}
				>
					<p>Find your perfect scent with our personalized quiz.</p>
				</FadeIn>
				<FadeIn
					className="mx-auto mt-10 max-w-fit translate-y-10"
					vars={{ opacity: 1, duration: 1 }}
				>
					<ButtonLink href="/quiz" variant="primary">
						Start Quiz
					</ButtonLink>
				</FadeIn>
			</div>
		</Bounded>
	);
}

export { CallToAction };

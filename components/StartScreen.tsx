"use client";
import { FadeIn } from "./FadeIn";
import RevealText from "./RevealText";

function StartScreen({ onStart }: { onStart: () => void }) {
	return (
		<div className="mx-auto max-w-4xl py-40 text-center">
			<FadeIn vars={{ delay: 0, duration: 1.2 }} className="translate-y-8">
				<p className="mb-4 tracking-widest uppercase">Fragrance Quiz</p>
			</FadeIn>
			<RevealText
				as="h1"
				id="start-screen-title"
				align="center"
				duration={2}
				staggerAmount={0.3}
				field={["The", "Côte", "Royale", "Fragrance", "Finder"]}
				className="font-display mb-8 text-5xl text-balance sm:text-6xl md:text-7xl"
			/>
			<FadeIn
				vars={{ delay: 1.2, duration: 2 }}
				className="mx-auto mb-12 max-w-2xl translate-y-8 text-lg text-balance text-gray-300"
			>
				Discover the fragrance crafted for you. Take our short quiz to uncover
				which Côte Royale scent aligns with your character, energy, and the
				impression you want to leave behind.
			</FadeIn>
			<FadeIn vars={{ delay: 1.4, duration: 2 }} className="translate-y-8">
				<button
					className="inline-flex w-fit cursor-pointer items-center gap-1 bg-neutral-50 px-6 py-4 text-base leading-none font-bold tracking-wider text-neutral-950 uppercase transition-colors duration-300 hover:bg-neutral-300"
					onClick={onStart}
				>
					Start Quiz
				</button>
			</FadeIn>
		</div>
	);
}

export default StartScreen;

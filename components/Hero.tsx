import Image from "next/image";
import { Bounded } from "./Bounded";
import { FadeIn } from "./FadeIn";
import RevealText from "./RevealText";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink } from "./ButtonLink";
gsap.registerPlugin(useGSAP, ScrollTrigger);

function Hero() {
	return (
		<Bounded
			as="header"
			className="relative min-h-screen overflow-hidden bg-neutral-950"
		>
			<FadeIn
				vars={{ scale: 1, opacity: 0.5 }}
				className="absolute inset-0 motion-safe:scale-125"
			>
				<Image
					src="/cottonbro.jpg"
					alt="Côte Royale"
					priority
					fill
					className="object-cover motion-reduce:opacity-50"
					sizes="100vw"
					style={{
						objectPosition: "center",
					}}
				/>
			</FadeIn>
			<div className="relative z-10 flex h-screen flex-col justify-center">
				<RevealText
					duration={1.7}
					staggerAmount={0.3}
					as="h1"
					field={["Effortless", "Elegance"]}
					id="hero-title"
					className="font-display max-w-xl text-6xl leading-none text-neutral-50 md:text-7xl lg:text-8xl"
				/>
				<FadeIn
					vars={{ opacity: 1, delay: 1, duration: 1.3 }}
					className="mt-6 max-w-md translate-y-10 text-lg text-neutral-100"
				>
					<p>
						An expression of quiet luxury, Côte Royale is designed for the man
						who commands attention without seeking it. A reflection of nature’s
						raw beauty.
					</p>
				</FadeIn>
				<FadeIn
					className="mt-10 translate-y-10"
					vars={{ opacity: 1, delay: 1.7, duration: 1.1 }}
				>
					<ButtonLink variant="secondary">Shop Now</ButtonLink>
				</FadeIn>
			</div>
		</Bounded>
	);
}

export { Hero };

"use client";
import { useRef } from "react";
import { Bounded } from "./Bounded";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ScrollTextProps {}
const text =
	"Côte Royale is designed for the man who commands attention without seeking it.";
function ScrollText(props: ScrollTextProps) {
	const words = text.split(" ");
	const componentRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLParagraphElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const component = componentRef.current;
			const textElement = textRef.current;
			const contentElement = contentRef.current;
			const letters = contentElement?.querySelectorAll("span");
			if (!component || !textElement || !contentElement || !letters) return;
			gsap.set(contentElement, { filter: "blur(40px)" });
			gsap.set(letters, { color: "hsl(220, 9%, 20%)" });

			gsap.to(contentElement, {
				filter: "blur(0px)",
				duration: 1,
				ease: "power2.inOut",
				scrollTrigger: {
					trigger: component,
					start: "top 75%",
					end: "top top",
					scrub: 2,
					markers: false,
				},
			});

			const colorT1 = gsap.timeline({
				scrollTrigger: {
					trigger: component,
					start: "top top",
					end: "bottom -100%",
					pin: true,
					scrub: 2,
					markers: false,
				},
			});

			colorT1.to(letters, {
				color: "#fafafa",
				stagger: { each: 0.01, from: "start", ease: "power1.inOut" },
			});

			colorT1.to(
				".glow-background",
				{
					opacity: 1,
					duration: 1,
					ease: "power2.inOut",
				},
				0,
			);
		},
		{ scope: componentRef },
	);
	return (
		<Bounded
			as="section"
			className="relative isolate flex h-screen flex-col items-center justify-center bg-neutral-950"
			ref={componentRef}
		>
			<div className="glow-background absolute inset-0 opacity-0"></div>
			<div className="absolute inset-0 bg-[url('/noisetexture.jpg')] opacity-30 mix-blend-multiply"></div>

			<div className="relative z-10">
				<h3
					ref={textRef}
					className={clsx(
						"mb-2 text-center font-sans text-sm tracking-wider text-neutral-200 uppercase md:mb-8 md:text-base",
					)}
				>
					Defining Luxury
				</h3>

				<div ref={contentRef} className="text-center">
					<p className="font-display flex flex-wrap justify-center text-4xl leading-tight text-balance uppercase md:text-5xl lg:text-6xl">
						{words.map((word, index) => (
							<span key={`${word}-${index}`} className="inline-block">
								{word.split("").map((letter, letterIndex) => (
									<span key={`${letter}-${letterIndex}`} className="inline">
										{letter}
									</span>
								))}
								{index < words.length - 1 ? (
									<span className="inline">&nbsp;</span>
								) : null}
							</span>
						))}
					</p>
				</div>
			</div>
		</Bounded>
	);
}

export { ScrollText };

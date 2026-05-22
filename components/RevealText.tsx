"use client";
import { useRef } from "react";
import clsx from "clsx";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealTextProps = {
	field: string[];
	id: string;
	className?: string;
	staggerAmount?: number;
	as?: React.ElementType;
	duration?: number;
	align?: "start" | "center" | "end";
	triggerStart?: string;
	triggerEnd?: string;
};

function RevealText({
	field,
	id,
	className,
	staggerAmount = 0.05,
	as: Component = "div",
	duration = 0.8,
	align = "start",
	triggerStart = "top 80%",
	triggerEnd = "bottom 20%",
}: RevealTextProps) {
	const componentRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			mm.add("(prefers-reduced-motion: no-preference)", () => {
				gsap.to(".reveal-text-word", {
					opacity: 1,
					y: 0,
					duration,
					ease: "power3.out",
					stagger: staggerAmount,
					scrollTrigger: {
						trigger: componentRef.current,
						start: triggerStart,
						end: triggerEnd,
					},
				});
			});

			mm.add("(prefers-reduced-motion: reduce)", () => {
				gsap.to(".reveal-text-word", {
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "none",
					stagger: 0,
				});
			});
		},
		{ scope: componentRef },
	);

	return (
		<Component
			ref={componentRef}
			className={clsx(
				"reveal-text text-balance",
				align === "start" && "text-left",
				align === "center" && "text-center",
				align === "end" && "text-right",
				className,
			)}
		>
			{field.map((word, index) => (
				<span
					key={`${id}-${word}-${index}`}
					className={clsx("mb-0 inline-block overflow-hidden pb-2", {
						"text-start": align === "start",
						"text-center": align === "center",
						"text-end": align === "end",
					})}
				>
					<span className="reveal-text-word mt-0 inline-block translate-y-[110%] will-change-transform">
						{word}&nbsp;
					</span>
				</span>
			))}
		</Component>
	);
}

export default RevealText;

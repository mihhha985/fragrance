"use client";
import { useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";

type LazyProps = ComponentProps<"div"> & {
	rootMargin?: string;
};

function Lazy({ children, rootMargin = "0px", ...props }: LazyProps) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const current = ref.current;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0, rootMargin },
		);

		if (current) observer.observe(current);

		return () => {
			if (current) observer.unobserve(current);
		};
	}, [rootMargin]);

	return (
		<div ref={ref} {...props}>
			{isVisible ? children : null}
		</div>
	);
}

export { Lazy };

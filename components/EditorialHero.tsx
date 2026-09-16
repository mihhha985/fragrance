import Image from "next/image";
import clsx from "clsx";

type EditorialHeroProps = {
	eyebrow: string;
	title: string;
	intro: string;
	image: string;
	imageAlt: string;
	align?: "left" | "right";
};

export function EditorialHero({
	eyebrow,
	title,
	intro,
	image,
	imageAlt,
	align = "left",
}: EditorialHeroProps) {
	return (
		<section className="relative isolate flex min-h-[78svh] items-end overflow-hidden">
			<Image
				src={image}
				alt={imageAlt}
				fill
				preload
				sizes="100vw"
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-black/30" />
			<div
				className={clsx(
					"absolute inset-0",
					align === "right"
						? "bg-linear-to-l from-black/90 via-black/35 to-transparent"
						: "bg-linear-to-r from-black/90 via-black/35 to-transparent",
				)}
			/>
			<div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-neutral-950 via-neutral-950/35 to-transparent" />

			<div
				className={clsx(
					"relative mx-auto w-full max-w-6xl px-6 pb-16 pt-32 md:pb-24",
					align === "right" && "flex justify-end",
				)}
			>
				<div className="max-w-2xl">
					<p className="mb-5 text-sm font-semibold tracking-[0.28em] text-white/75 uppercase">
						{eyebrow}
					</p>
					<h1 className="text-5xl leading-[0.95] text-white sm:text-6xl md:text-8xl">
						{title}
					</h1>
					<p className="mt-7 max-w-xl text-base leading-7 text-white/80 md:text-lg md:leading-8">
						{intro}
					</p>
				</div>
			</div>
		</section>
	);
}

import Image from "next/image";
import { Bounded } from "./Bounded";
import { FadeIn } from "./FadeIn";
import { formatPrice } from "@/utils/formatters";
import { ButtonLink } from "./ButtonLink";

function ProductFutures() {
	const price = 11000;
	const formattedPrice = formatPrice(price);

	return (
		<Bounded
			as="section"
			className="overflow-hidden bg-black py-16 text-white md:py-24"
		>
			<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
				<FadeIn
					vars={{ duration: 1, opacity: 1 }}
					start="top 60%"
					className="translate-y-16 opacity-0 lg:col-span-2"
				>
					<Image
						src="/grid-picture.jpg"
						alt="Product Futures"
						width={1000}
						height={1000}
						className="h-auto w-full object-cover"
					/>
				</FadeIn>

				<div className="flex h-full flex-col justify-between">
					<FadeIn
						vars={{ duration: 1, opacity: 1 }}
						className="translate-y-16 space-y-6 self-start bg-white/10 p-10 opacity-0"
					>
						<h2 className="font-sans text-3xl leading-tight font-semibold lg:text-4xl">
							Powerful Simplicity.
						</h2>
						<p className="max-w-lg text-base text-gray-300">
							An expression of quiet luxury, Côte Royale is designed for the man
							who commands attention without seeking it. A reflection of
							nature’s raw beauty, redefined for today.
						</p>
					</FadeIn>

					<FadeIn
						vars={{ duration: 1, opacity: 1 }}
						className="relative translate-y-16 bg-white/10 p-10 opacity-0 will-change-transform"
					>
						<Image
							src="/ignis-bottle.png"
							alt="Product Futures"
							width={1000}
							height={1000}
							className="mx-auto -mt-10 w-full -rotate-12 md:-mt-20"
						/>
						<div className="flex justify-between p-10 pt-4">
							<div className="space-y-1 font-sans">
								<h3 className="text-2xl">Ignis</h3>
								<p className="mt-2 text-gray-400">Eau de Parfum</p>
								<ButtonLink variant="secondary">Shop Now</ButtonLink>
							</div>
							<p>{formattedPrice}</p>
						</div>
					</FadeIn>
				</div>
			</div>
		</Bounded>
	);
}

export { ProductFutures };

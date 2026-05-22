import { BsPlus } from "react-icons/bs";
import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { ButtonLink } from "./ButtonLink";
import { FragranceAttributes } from "./FragranceAttributes";

function FragranceDisplay() {
	return (
		<FadeIn
			vars={{ opacity: 1, duration: 2.5 }}
			start={"top 50%"}
			className="relative z-10 grid min-h-[85vh] w-full translate-y-16 items-center justify-items-start border border-white/10 text-left md:p-14 lg:pl-20"
		>
			<Image
				src="/terra-ad.png"
				alt="Fragrance 1"
				quality={75}
				sizes="80vw"
				fill
				className="z-0 object-cover opacity-40 md:opacity-100"
			/>

			<FadeIn
				vars={{ opacity: 1, duration: 3, delay: 0.8 }}
				className="relative z-10 translate-y-8"
			>
				<div className="max-w-md">
					<h3 className="mb-3 text-5xl md:text-6xl lg:text-7xl">Terra</h3>
					<p className="mb-8 text-base font-semibold text-gray-300">
						Eau de Parfum
					</p>
					<p className="mb-10 text-lg text-gray-300">
						Rooted in strength, Terra is a tribute to nature’s quiet power. Deep
						woods and herbal notes evoke the scent of earth after rain—calm,
						grounded, and refined. For the man who commands attention without
						effort, Terra embodies the beauty of balance.
					</p>
					<FragranceAttributes
						scentProfile="spicy"
						mood="bold"
						className="mb-10"
					/>
					<div className="flex flex-wrap gap-4">
						<ButtonLink variant="secondary">Learn More</ButtonLink>
						<ButtonLink variant="primary">
							<BsPlus />
							Buy Now
						</ButtonLink>
					</div>
				</div>
			</FadeIn>
		</FadeIn>
	);
}

export { FragranceDisplay };

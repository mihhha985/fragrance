import Image from "next/image";
import { formatPrice } from "@/utils/formatters";
import data from "@/data/fragrance.json";
import { TransitionLink } from "./TransitionLink";

type OtherFragrancesProps = {
	currentFragranceUid: string;
};

export const OtherFragrances = async ({
	currentFragranceUid,
}: OtherFragrancesProps) => {
	const otherFragrances = data.filter(
		(fragrance) => fragrance.uid !== currentFragranceUid,
	);

	return (
		<div className="container mx-auto px-4">
			<h2 className="font-display mb-8 text-3xl text-white md:text-4xl">
				You may also like
			</h2>

			<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{otherFragrances.map((fragrance) => (
					<li key={fragrance.uid}>
						<TransitionLink
							href={`/fragrance/${fragrance.uid}`}
							className="group"
						>
							<div className="relative aspect-square w-full transition-transform duration-500 group-hover:scale-105">
								<Image
									src={`/${fragrance.uid}-bottle.png`}
									width={600}
									height={600}
									className="h-auto w-full"
									alt={fragrance.title}
								/>
							</div>

							<div className="mt-8 space-y-1 text-white">
								<h3 className="font-display text-2xl">{fragrance.title}</h3>
								<p className="text-sm text-neutral-400">Eau de Parfum</p>
								<p className="text-base font-light">
									{formatPrice(fragrance.price)}
								</p>
							</div>
						</TransitionLink>
					</li>
				))}
			</ul>
		</div>
	);
};

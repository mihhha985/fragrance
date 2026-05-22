import Image from "next/image";
import { notFound } from "next/navigation";
import { Bounded } from "@/components/Bounded";
import type { Metadata } from "next";
import { FragranceAttributes } from "@/components/FragranceAttributes";
import { formatPrice } from "@/utils/formatters";
import { HiStar } from "react-icons/hi";
import { OtherFragrances } from "@/components/OtherFragrances";
import data from "@/data/fragrance.json";
import type { Fragrance } from "@/types/fragrance";

export const metadata: Metadata = {
	title: "Fragrance",
	description: "Fragrance is a type of perfume that is used to scent the body.",
	openGraph: {
		title: "Fragrance",
		description:
			"Fragrance is a type of perfume that is used to scent the body.",
		images: ["/terra-og-image.png"],
	},
};

export default async function FragrancePage({
	params,
}: {
	params: Promise<{ uid: string }>;
}) {
	const { uid } = await params;
	const fragrances = data as Fragrance[];
	const fragrance = fragrances.find((fragrance) => fragrance.uid === uid);
	if (!fragrance) {
		return notFound();
	}

	return (
		<Bounded as="article" className="min-h-screen py-14 md:py-18">
			<div className="flex flex-col gap-8 lg:flex-row">
				<div className="relative mb-14 flex justify-center pb-10">
					<Image
						src={`/${fragrance.uid}-bottle.png`}
						alt="Fragrance"
						width={600}
						height={600}
						priority
						className="absolute top-[90%] -scale-y-100 [mask:linear-gradient(to_bottom,rgba(0,0,0,0)_70%,rgba(0,0,0,.15)_100%)]"
					/>
					<Image
						src={`/${fragrance.uid}-bottle.png`}
						alt="Fragrance"
						width={600}
						height={600}
						priority
						className="relative"
					/>
				</div>
				<div className="flex-1 text-white">
					<h1 className="font-display mb-4 border-b border-neutral-700 pb-2 text-4xl md:text-5xl">
						{fragrance.title}
					</h1>

					<div className="space-y-6">
						<p className="text-md font-semibold">Eau de Parfum Spray</p>

						<p>{fragrance.description}</p>

						<FragranceAttributes
							mood={fragrance.mood}
							scentProfile={fragrance.scentProfile}
						/>
						<p className="mt-10 text-3xl font-light">
							{formatPrice(fragrance.price)}
						</p>

						<button className="w-full bg-white py-3 font-medium text-black uppercase transition duration-200 hover:bg-neutral-200">
							Add to Cart
						</button>

						<div className="flex items-center gap-4 border-t border-neutral-700 pt-6">
							<a href="#" className="hover:text-neutral-300">
								763 total reviews
							</a>

							<div className="flex">
								{[...Array(4)].map((_, index) => (
									<HiStar className="size-5 text-white" key={index} />
								))}
								<HiStar className="size-5 text-white/50" />
							</div>
							<span>4.4/5</span>
						</div>
					</div>
				</div>
			</div>

			<OtherFragrances currentFragranceUid={uid} />
		</Bounded>
	);
}

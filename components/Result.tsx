"use client";
import Image from "next/image";
import { FadeIn } from "./FadeIn";
import type { FragranceType, Vote, Winner } from "@/types/quiz";
import { HiStar } from "react-icons/hi";
import { ButtonLink } from "./ButtonLink";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
//import { type Fragrance, fragranceData } from "@/types/fragrance";
gsap.registerPlugin(useGSAP);

type ResultProps = {
	votes: Vote;
	onRetakeQuiz: () => void;
};

export const Result = ({ votes, onRetakeQuiz }: ResultProps) => {
	console.log("Total:", votes);
	const determineWinners = (votes: Vote): FragranceType => {
		const maxVote = Math.max(votes.Terra, votes.Ignis, votes.Aqua);

		const winningTypes: FragranceType[] = [];
		if (votes.Terra === maxVote) winningTypes.push("Terra");
		if (votes.Ignis === maxVote) winningTypes.push("Ignis");
		if (votes.Aqua === maxVote) winningTypes.push("Aqua");

		return winningTypes[0];
	};

	const winner = determineWinners(votes);

	useGSAP(() => {
		gsap.set(".bottle-image", {
			filter: "brightness(0) blur(10px)",
			opacity: 1,
		});

		const tl = gsap.timeline();

		tl.to(
			".result-item",
			{
				opacity: 1,
				y: 0,
				duration: 1,
				stagger: 0.5,
				ease: "power2.",
			},
			"-=0.4",
		).to(
			".bottle-image",
			{
				duration: 1.7,
				filter: "brightness(1) blur(0px)",
				ease: "sine.in",
			},
			"-=0.8",
		);
	}, []);

	return (
		<FadeIn
			className="mx-auto max-w-4xl translate-y-5 py-10 text-center opacity-0"
			vars={{ duration: 0.8 }}
		>
			<div className="mb-10">
				<p className="mb-3 tracking-widest uppercase">Result</p>
				<h2 className="font-display mb-6 text-5xl md:text-6xl">
					Your Personalized Recommendation
				</h2>
				<p className="mb-14 text-lg text-gray-300">
					A unique selection of fragrances that are most suited to you and your
					personal taste
				</p>
			</div>

			<div className="result-item group mx-auto max-w-md translate-y-5 text-left opacity-100">
				<div className="mt-40 mb-6 grid bg-neutral-200/10 transition-colors duration-700 group-hover:bg-neutral-200/20">
					<Image
						src={`/${winner.toLowerCase()}-bottle.png`}
						alt={winner}
						width={500}
						height={600}
						priority
						className="bottle-image -mt-40 max-w-96 -rotate-12 opacity-0 blur-md transition-all duration-700 group-hover:scale-110 group-hover:rotate-0 group-hover:brightness-125"
					/>
				</div>

				<div className="mb-6 p-6">
					<div className="mb-2 flex flex-col items-center gap-2">
						<span className="inline-flex items-center gap-1 text-white">
							<HiStar />
							<span>4.8</span>
							<span className="ml-3 text-gray-400">(120 Reviews)</span>
						</span>

						<h3 className="font-display">{winner} Eau De Parfum</h3>
						<ButtonLink>Buy now</ButtonLink>
					</div>
				</div>
			</div>

			<button
				onClick={onRetakeQuiz}
				className="mb-12 inline-block cursor-pointer border border-white px-12 py-4 font-extrabold tracking-wider text-white uppercase"
			>
				Retake Quiz
			</button>
		</FadeIn>
	);
};

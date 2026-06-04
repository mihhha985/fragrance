export type FragranceType = "Terra" | "Ignis" | "Aqua";

export type AnsweOption = {
	text: string;
	value: FragranceType;
	image?: string;
};

export type Vote = {
	Terra: number;
	Ignis: number;
	Aqua: number;
};

export type Winner = {
	fragranceType: FragranceType;
	title: string;
	uid?: string;
};

export type QuizQuestion = {
	id: number;
	question: string;
	options: AnsweOption[];
};

export const quizQuestions = [
	{
		id: 1,
		question: "What scents do you prefer?",
		options: [
			{
				text: "Cedar wood, Sandal wood",
				value: "Terra",
				image: "/cedarwood.jpg",
			},
			{
				text: "Cinnamon, Cardamom, Amber",
				value: "Ignis",
				image: "/amber.jpg",
			},
			{
				text: "Ocean, Citrus",
				value: "Aqua",
				image: "/ocean.jpg",
			},
		],
	},
	{
		id: 2,
		question: "What's your ideal evening?",
		options: [
			{
				text: "A slow evening at a countryside estate, taking in the fresh air",
				value: "Terra",
				image: "/estate.jpg",
			},
			{
				text: "A whiskey by the fire, surrounded by deep conversation",
				value: "Ignis",
				image: "/whiskey.jpg",
			},
			{
				text: "A late-night swim under the stars, the waves crashing softly",
				value: "Aqua",
				image: "/nightswim.jpg",
			},
		],
	},
	{
		id: 3,
		question: "What's Your Style?",
		options: [
			{
				text: "Timeless and effortlessly cool - never trying too hard",
				value: "Terra",
				image: "/classic-style.jpg",
			},
			{
				text: "Bold, striking, impossible to ignore",
				value: "Ignis",
				image: "/bold-style.jpg",
			},
			{
				text: "Refined, but always with an unexpected edge",
				value: "Aqua",
				image: "/refined-edge.jpg",
			},
		],
	},
	{
		id: 4,
		question: "What’s Your Approach to Life?",
		options: [
			{
				text: "Calculated and patient - let things come naturally",
				value: "Terra",
				image: "/patient-vibe.jpg",
			},
			{
				text: "All or nothing - make bold moves, no hesitation",
				value: "Ignis",
				image: "/bold-moves.jpg",
			},
			{
				text: "Adapt and flow - never rigid, always ahead of the curve",
				value: "Aqua",
				image: "/adapt-and-flow.jpg",
			},
		],
	},
] as QuizQuestion[];

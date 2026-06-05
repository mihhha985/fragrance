export type moodKey = "bold" | "grounded" | "refreshing";
export type scentProfileKey = "spicy" | "woody" | "fresh";

export type Fragrance = {
	uid: string;
	title: string;
	description: string;
	mood: moodKey;
	scentProfile: scentProfileKey;
	price: number;
};

export const fragranceData: Fragrance[] = [
	{
		uid: "123",
		title: "terra",
		description:
			"Rooted in strength, Terra is a tribute to nature’s quiet power. Deep woods and herbal notes evoke the scent of earth after rain—calm, grounded, and refined. For the man who commands attention without effort, Terra embodies the beauty of balance.",
		mood: "bold",
		scentProfile: "woody",
		price: 110,
	},
	{
		uid: "345",
		title: "aqua",
		description:
			"Cool and invigorating, Aqua channels the untamed spirit of the ocean. Crisp aquatic notes flow over mineral woods, capturing the mystery of open water. As refreshing as a sea breeze yet as commanding as the tide, Aqua is for the man who moves with quiet strength.",
		mood: "refreshing",
		scentProfile: "fresh",
		price: 120,
	},
	{
		uid: "678",
		title: "ignis",
		description:
			"Forged in fire, Ignis is a bold statement of power and poise. Smoldering spices and rich woods create an intense, magnetic presence. For the man whose quiet confidence speaks volumes, this fragrance captures fire’s raw allure—uncompromising and unforgettable.",
		mood: "grounded",
		scentProfile: "spicy",
		price: 130,
	},
];

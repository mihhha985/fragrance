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

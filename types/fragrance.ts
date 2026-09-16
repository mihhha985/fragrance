export type Fragrance = {
	uid: string;
	title: string;
	description: string;
	mood: "bold" | "grounded" | "refreshing";
	scentProfile: "spicy" | "woody" | "fresh";
	price: number;
};

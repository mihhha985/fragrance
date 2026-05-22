import {
	LuFlame,
	LuLeaf,
	LuTreePine,
	LuCrown,
	LuGem,
	LuZap,
} from "react-icons/lu";

import type { IconType } from "react-icons";
type AttributeData = {
	label: string;
	icon: IconType;
};

const SCENT_PROFILES: Record<string, AttributeData> = {
	spicy: { label: "Spicy & Smoky", icon: LuFlame },
	woody: { label: "Woody & Herbal", icon: LuTreePine },
	fresh: { label: "Fresh & Aquatic", icon: LuLeaf },
};

const MOODS: Record<string, AttributeData> = {
	bold: { label: "Bold & Seductive", icon: LuCrown },
	grounded: { label: "Grounded & Sophisticated", icon: LuGem },
	refreshing: { label: "Refreshing & Invigorating", icon: LuZap },
};

type FragranceAttributesProps = {
	scentProfile: string;
	mood: string;
	className?: string;
};

function FragranceAttributes({
	scentProfile,
	mood,
	className,
}: FragranceAttributesProps) {
	console.log(scentProfile, mood);
	const scentProfileData = SCENT_PROFILES[scentProfile];
	const moodData = MOODS[mood];
	if (!scentProfileData || !moodData) {
		return null;
	}

	return (
		<div className={className}>
			<p className="mb-2 text-base font-semibold text-gray-300 uppercase">
				Features:
			</p>
			<p className="flex items-center gap-2">
				<scentProfileData.icon className="size-4" />
				{scentProfileData.label}
			</p>
			<p className="flex items-center gap-2">
				<moodData.icon className="size-4" />
				{moodData.label}
			</p>
		</div>
	);
}

export { FragranceAttributes };

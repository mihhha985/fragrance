import { getTranslator, type Locale } from "@/utils/i18n";
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
	locale: Locale;
	mood: string;
	className?: string;
};

function FragranceAttributes({
	scentProfile,
	locale,
	mood,
	className,
}: FragranceAttributesProps) {
	const t = getTranslator(locale);
	const scentProfileData = SCENT_PROFILES[scentProfile];
	const moodData = MOODS[mood];
	if (!scentProfileData || !moodData) {
		return null;
	}

	return (
		<div className={className}>
			<p className="mb-2 text-base font-semibold text-gray-300 uppercase">
				{t("Features:")}
			</p>
			<p className="flex items-center gap-2">
				<scentProfileData.icon className="size-4" />
				{t(scentProfileData.label)}
			</p>
			<p className="flex items-center gap-2">
				<moodData.icon className="size-4" />
				{t(moodData.label)}
			</p>
		</div>
	);
}

export { FragranceAttributes };

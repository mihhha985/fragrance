"use client";
import { Link } from "next-view-transitions";
import { useI18n } from "./LocaleProvider";
import { localizedPath } from "@/utils/i18n";

export type TransitionLinkProps = {
	href: string;
	children?: React.ReactNode;
	className?: string;
	onClick?: () => void;
	tabIndex?: number;
	"aria-label"?: string;
};

export const TransitionLink = ({
	href,
	children,
	className,
	onClick,
	tabIndex,
	"aria-label": ariaLabel,
}: TransitionLinkProps) => {
	const { locale } = useI18n();
	return (
		<Link
			href={localizedPath(href, locale)}
			aria-label={ariaLabel}
			className={className}
			onClick={onClick}
			tabIndex={tabIndex}
		>
			{children}
		</Link>
	);
};

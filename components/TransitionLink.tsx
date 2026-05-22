import { Link } from "next-view-transitions";

export type TransitionLinkProps = {
	href: string;
	children?: React.ReactNode;
	className?: string;
	onClick?: () => void;
	tabIndex?: number;
};

export const TransitionLink = ({
	href,
	children,
	className,
	onClick,
	tabIndex,
}: TransitionLinkProps) => {
	return (
		<Link
			href={href}
			className={className}
			onClick={onClick}
			tabIndex={tabIndex}
		>
			{children}
		</Link>
	);
};

import clsx from "clsx";
import { TransitionLink } from "./TransitionLink";

interface ButtonLinkProps {
	children: React.ReactNode;
	variant?: "primary" | "secondary";
	className?: string;
	href?: string;
}

function ButtonLink({
	href,
	children,
	variant = "primary",
	className,
}: ButtonLinkProps) {
	return (
		<TransitionLink
			href={href ?? "#"}
			className={clsx(
				"flex w-fit cursor-pointer items-center gap-1 px-6 py-3 text-base leading-none font-bold tracking-wider uppercase transition-colors duration-300",
				variant === "primary" &&
					"bg-neutral-50 text-neutral-950 hover:bg-neutral-300",
				variant === "secondary" &&
					"border-2 border-neutral-50 text-neutral-50 hover:bg-white/10 hover:text-white",
				className,
			)}
		>
			{children}
		</TransitionLink>
	);
}

export { ButtonLink };

"use client";
import clsx from "clsx";
import { addToCart } from "@/utils/cart";
import { useRouter } from "next/navigation";
import { TransitionLink } from "./TransitionLink";
import { useI18n } from "./LocaleProvider";
import { localizedPath } from "@/utils/i18n";

interface ButtonLinkProps {
	children: React.ReactNode;
	variant?: "primary" | "secondary";
	className?: string;
	href?: string;
	productUid?: string;
}

function ButtonLink({
	href,
	children,
	variant = "primary",
	className,
	productUid,
}: ButtonLinkProps) {
	const router = useRouter();
	const { locale } = useI18n();
	const classes = clsx(
		"flex w-fit cursor-pointer items-center gap-1 px-6 py-3 text-base leading-none font-bold tracking-wider uppercase text-nowrap transition-colors duration-300",
		variant === "primary" &&
			"bg-neutral-50 text-neutral-950 hover:bg-neutral-300",
		variant === "secondary" &&
			"border-2 border-neutral-50 text-neutral-50 hover:bg-white/10 hover:text-white",
		className,
	);
	if (productUid)
		return (
			<button
				type="button"
				className={classes}
				onClick={() => {
					addToCart(productUid);
					router.push(localizedPath("/cart", locale));
				}}
			>
				{children}
			</button>
		);
	return (
		<TransitionLink href={href ?? "/fragrance/terra"} className={classes}>
			{children}
		</TransitionLink>
	);
}

export { ButtonLink };

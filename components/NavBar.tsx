"use client";
import { useI18n } from "./LocaleProvider";
import { TransitionLink } from "./TransitionLink";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isLocale, localizedPath } from "@/utils/i18n";
import { useCart } from "@/utils/cart";
import { HiBars3, HiShoppingBag, HiXMark } from "react-icons/hi2";
import data from "@/data/fragrance.json";

import type { Fragrance } from "@/types/fragrance";
type NavIconsProps = {
	className?: string;
	tabIndex?: number;
	onClick?: () => void;
};

const NavIcons = ({ className = "", tabIndex, onClick }: NavIconsProps) => {
	const { t } = useI18n();
	const count = useCart().reduce((sum, item) => sum + item.quantity, 0);
	return (
		<div className={clsx("flex items-center gap-8", className)}>
			<TransitionLink
				href="/cart"
				className="menu-icon flex items-center gap-2"
				tabIndex={tabIndex}
				onClick={onClick}
			>
				<HiShoppingBag size={24} />
				<span className="sr-only">{t("Cart,")} </span>
				<span>{count}</span>
				<span className="sr-only"> {t("items")}</span>
			</TransitionLink>
		</div>
	);
};

/*
type NavBarProps = {
  settings: Content.SettingsDocument;
};
*/
export const NavBar = () => {
	const { locale, t } = useI18n();
	const pathname = usePathname();
	const router = useRouter();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	useEffect(() => {
		if (!isDrawerOpen) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const close = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsDrawerOpen(false);
		};
		window.addEventListener("keydown", close);
		return () => {
			document.body.style.overflow = previous;
			window.removeEventListener("keydown", close);
		};
	}, [isDrawerOpen]);

	const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

	const fragrances = data as Fragrance[];

	return (
		<header>
			<div className="navbar fixed top-0 left-0 z-50 w-full bg-black text-white">
				<div className="flex items-center justify-between p-2 md:p-4">
					<button
						onClick={toggleDrawer}
						aria-label={t("Menu")}
						aria-expanded={isDrawerOpen}
						aria-controls="navigation-drawer"
						className="menu-icon"
					>
						<HiBars3 size={24} />
					</button>

					<div className="absolute left-1/2 -translate-x-1/2 transform">
						<TransitionLink href="/">
							<Image
								src="/logo.svg"
								alt="Côte Royale Paris"
								width={180}
								height={30}
								className="w-32 md:w-44"
							/>
						</TransitionLink>
					</div>

					<div className="flex">
						<NavIcons />
					</div>
				</div>
			</div>

			<div
				className={clsx(
					"navbar-drawer-blur fixed inset-0 z-40 bg-black/40 opacity-0 transition-all duration-500",
					isDrawerOpen
						? "pointer-events-auto opacity-100 backdrop-blur-xs"
						: "pointer-events-none backdrop-blur-none",
				)}
				onClick={toggleDrawer}
				aria-hidden="true"
			/>

			<div
				className={clsx(
					"nav-drawer fixed top-0 left-0 z-50 h-full w-72 overflow-y-auto bg-neutral-900 p-6 transition-transform duration-500",
					isDrawerOpen ? "translate-x-0" : "-translate-x-full",
				)}
				id="navigation-drawer"
				inert={!isDrawerOpen}
				aria-label={t("Navigation menu")}
			>
				<div className="mb-6 flex justify-end">
					<button
						className="p-2 text-white transition-colors duration-300 hover:bg-white/10"
						onClick={toggleDrawer}
						aria-label={t("Close Menu")}
						tabIndex={isDrawerOpen ? 0 : -1}
					>
						<HiXMark size={24} />
					</button>
				</div>

				<nav className="space-y-4" aria-label={t("Main Navigation")}>
					<TransitionLink
						href="/"
						onClick={() => setIsDrawerOpen(false)}
						className="nav-link"
						tabIndex={isDrawerOpen ? 0 : -1}
					>
						{t("Home")}
					</TransitionLink>
					{fragrances.map((item) => (
						<TransitionLink
							href={`/fragrance/${item.uid}`}
							onClick={() => setIsDrawerOpen(false)}
							key={item.uid}
							className="nav-link"
							tabIndex={isDrawerOpen ? 0 : -1}
						>
							{item.title}
						</TransitionLink>
					))}
					<div className="pt-4 md:hidden">
						<NavIcons
							onClick={() => setIsDrawerOpen(false)}
							className="justify-around"
							tabIndex={isDrawerOpen ? 0 : -1}
						/>
					</div>
					<label
						className="block border-t border-white/10 pt-6 text-sm tracking-wide"
						htmlFor="language-select"
					>
						{t("Language")}
						<select
							id="language-select"
							value={locale}
							className="mt-3 w-full border border-white/30 bg-neutral-950 px-3 py-3 text-white focus:border-white"
							onChange={(event) => {
								const next = event.target.value;
								if (!isLocale(next)) return;
								document.cookie = `locale=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
								setIsDrawerOpen(false);
								router.push(
									localizedPath(pathname, next) +
										window.location.search +
										window.location.hash,
								);
							}}
						>
							<option value="ru" lang="ru">
								Русский
							</option>
							<option value="en" lang="en">
								English
							</option>
						</select>
					</label>
				</nav>
			</div>
		</header>
	);
};

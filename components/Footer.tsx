import { getTranslator, type LocaleProps } from "@/utils/i18n";
import { ReactNode } from "react";
import { TransitionLink as Link } from "./TransitionLink";
import Image from "next/image";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export const Footer = ({ locale }: LocaleProps) => {
	const t = getTranslator(locale);
	return (
		<footer aria-labelledby="footer-heading" className="footer bg-black py-16">
			<h2 id="footer-heading" className="sr-only">
				{t("Footer")}
			</h2>
			<div className="container mx-auto px-6">
				<div className="grid gap-10 md:grid-cols-3">
					<NavGroup title={t("Shop")}>
						<NavLink href="/fragrance/terra">Terra</NavLink>
						<NavLink href="/fragrance/ignis">Ignis</NavLink>
						<NavLink href="/fragrance/aqua">Aqua</NavLink>
					</NavGroup>

					<NavGroup title={t("About")}>
						<NavLink href="/science">{t("Science")}</NavLink>
						<NavLink href="/our-story">{t("Our Story")}</NavLink>
						<NavLink href="/">Côte Royale</NavLink>
					</NavGroup>

					<NavGroup title={t("Social")}>
						<SocialLink href="https://www.instagram.com/" label="Instagram">
							<SiInstagram aria-hidden="true" />
						</SocialLink>
						<SocialLink href="https://x.com/" label="X (Twitter)">
							<SiX aria-hidden="true" />
						</SocialLink>
						<SocialLink href="https://www.facebook.com/" label="Facebook">
							<SiFacebook aria-hidden="true" />
						</SocialLink>
					</NavGroup>
				</div>

				{/* Bottom footer */}
				<div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-neutral-800 pt-8 md:flex-row">
					<p className="text-center text-sm text-gray-400">
						© {new Date().getFullYear()}{" "}
						{t("Côte Royale Inc. All rights reserved")}
					</p>
					<Link
						href="/"
						aria-label={t("Côte Royale Home")}
						className="order-first md:order-0"
					>
						<Image
							src="/logo.svg"
							alt="CÔTE ROYALE"
							width={150}
							height={25}
							className="h-auto"
						/>
					</Link>
					<ul
						aria-label={t("Legal")}
						className="flex flex-wrap justify-center gap-6 text-sm text-gray-400"
					>
						<li>
							<Link href="/terms" className="hover:text-white">
								{t("Terms & conditions")}
							</Link>
						</li>
						<li>
							<Link href="/privacy" className="hover:text-white">
								{t("Privacy Policy")}
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

type NavGroupProps = {
	title: string;
	children?: ReactNode;
};

const NavGroup = ({ title, children }: NavGroupProps) => (
	<nav aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}>
		<h3
			id={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}
			className="mb-6 text-xl font-medium"
		>
			{title}
		</h3>
		<ul className="space-y-4" role="list">
			{children}
		</ul>
	</nav>
);

type NavLinkProps = {
	href: string;
	children: ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
	return (
		<li>
			<Link href={href} className="hover:text-gray-300">
				{children}
			</Link>
		</li>
	);
};

const SocialLink = ({
	href,
	label,
	children,
}: NavLinkProps & { label: string }) => (
	<li>
		<a
			href={href}
			aria-label={label}
			target="_blank"
			rel="noreferrer"
			className="inline-flex items-center gap-3 text-gray-400 transition-colors hover:text-white"
		>
			{children}
			<span>{label}</span>
		</a>
	</li>
);

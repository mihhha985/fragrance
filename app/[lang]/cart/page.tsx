"use client";
import { useI18n } from "@/components/LocaleProvider";
import { localizedPath } from "@/utils/i18n";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Bounded } from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";
import { TransitionLink } from "@/components/TransitionLink";
import { clearCart, setQuantity, useCart } from "@/utils/cart";
import { formatPrice } from "@/utils/formatters";
import fragrances from "@/data/fragrance.json";

const subscribe = () => () => {};

export default function CartPage() {
	const { locale, t } = useI18n();
	const cart = useCart();
	const ready = useSyncExternalStore(
		subscribe,
		() => true,
		() => false,
	);
	const router = useRouter();
	const submitting = useRef(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const items = cart.flatMap((item) => {
		const product = fragrances.find((product) => product.uid === item.uid);
		return product ? [{ ...product, quantity: item.quantity }] : [];
	});
	const total = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	return (
		<Bounded className="glow-background min-h-[75vh] py-16 md:py-24">
			<p className="mb-4 text-sm tracking-[0.2em] text-gray-300 uppercase">
				{t("Côte Royale · Your selection")}
			</p>
			<h1 className="mb-10 text-5xl md:text-7xl">{t("Your Bag")}</h1>
			{!ready ? (
				<p role="status">{t("Loading your bag…")}</p>
			) : items.length === 0 && !isSubmitting ? (
				<div className="space-y-8 border-t border-white/10 py-10">
					<p className="text-lg text-gray-300">
						{t("Your bag is empty. Discover your signature fragrance.")}
					</p>
					<ButtonLink href="/fragrance/terra">
						{t("Explore fragrances")}
					</ButtonLink>
				</div>
			) : (
				<div className="grid gap-12 lg:grid-cols-2">
					<div>
						{items.map((item) => (
							<div
								key={item.uid}
								className="flex gap-4 border-t border-white/10 py-6 sm:gap-6"
							>
								<Image
									src={`/${item.uid}-bottle.png`}
									alt={item.title}
									width={120}
									height={150}
									className="h-36 w-24 object-contain sm:w-28"
								/>
								<div className="min-w-0 flex-1 space-y-3">
									<TransitionLink
										href={`/fragrance/${item.uid}`}
										className="font-display text-3xl"
									>
										{item.title}
									</TransitionLink>
									<p className="text-sm text-gray-400">
										{t("Eau de Parfum ·")} {formatPrice(item.price, locale)}
									</p>
									<div className="flex flex-wrap items-center gap-4">
										<div className="flex items-center border border-white/30">
											<button
												type="button"
												disabled={isSubmitting || item.quantity <= 1}
												aria-label={`${t("Decrease quantity")}: ${item.title}`}
												onClick={() => setQuantity(item.uid, item.quantity - 1)}
												className="px-4 py-2 hover:bg-white/10 disabled:opacity-30"
											>
												−
											</button>
											<span
												aria-label={`${t("Quantity")}: ${item.title}`}
												className="min-w-6 text-center"
											>
												{item.quantity}
											</span>
											<button
												type="button"
												disabled={isSubmitting || item.quantity >= 99}
												aria-label={`${t("Increase quantity")}: ${item.title}`}
												onClick={() => setQuantity(item.uid, item.quantity + 1)}
												className="px-4 py-2 hover:bg-white/10 disabled:opacity-30"
											>
												+
											</button>
										</div>
										<button
											type="button"
											disabled={isSubmitting}
											onClick={() => setQuantity(item.uid, 0)}
											className="text-sm text-gray-400 underline hover:text-white"
										>
											{t("Remove")} {item.title}
										</button>
									</div>
									<p>{formatPrice(item.price * item.quantity, locale)}</p>
								</div>
							</div>
						))}
						<div
							aria-live="polite"
							className="flex justify-between border-t border-white/30 py-6 text-2xl"
						>
							<span>{t("Total")}</span>
							<span>{formatPrice(total, locale)}</span>
						</div>
						<TransitionLink href="/" className="text-sm underline">
							{t("Continue shopping")}
						</TransitionLink>
					</div>
					<form
						className="h-fit space-y-6 border border-white/10 bg-white/5 p-6 md:p-10"
						onSubmit={(event) => {
							event.preventDefault();
							if (submitting.current || items.length === 0) return;
							submitting.current = true;
							setIsSubmitting(true);
							clearCart();
							router.replace(localizedPath("/thank-you", locale));
						}}
					>
						<h2 className="text-4xl">{t("Guest checkout")}</h2>
						<p className="text-sm leading-relaxed text-gray-300">
							{t(
								"No account needed. This is a demo order: no payment, delivery or notifications. Your details are not saved or sent.",
							)}
						</p>
						<fieldset disabled={isSubmitting} className="space-y-5">
							<legend className="sr-only">{t("Delivery details")}</legend>
							{[
								{ name: "name", label: "Full name", autoComplete: "name" },
								{
									name: "address",
									label: "Street address",
									autoComplete: "street-address",
								},
								{ name: "city", label: "City", autoComplete: "address-level2" },
								{
									name: "postal",
									label: "Postal code",
									autoComplete: "postal-code",
								},
								{
									name: "country",
									label: "Country",
									autoComplete: "country-name",
								},
							].map((field) => (
								<label key={field.name} className="block text-sm tracking-wide">
									{t(field.label)}
									<input
										name={field.name}
										autoComplete={field.autoComplete}
										required
										pattern=".*\S.*"
										maxLength={160}
										className="mt-2 block w-full border border-white/30 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-white"
									/>
								</label>
							))}
						</fieldset>
						<button
							type="submit"
							disabled={isSubmitting || !items.length}
							className="w-full cursor-pointer bg-neutral-50 px-6 py-4 font-bold tracking-wider text-neutral-950 uppercase transition-colors hover:bg-neutral-300 disabled:opacity-50"
						>
							{isSubmitting ? t("Completing order…") : t("Place demo order")}
						</button>
					</form>
				</div>
			)}
		</Bounded>
	);
}

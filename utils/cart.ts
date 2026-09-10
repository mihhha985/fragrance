"use client";

import { useSyncExternalStore } from "react";
import fragrances from "@/data/fragrance.json";

export type CartItem = { uid: string; quantity: number };
const key = "cote-royale-cart";
const empty: CartItem[] = [];
let cachedRaw: string | null | undefined;
let cachedItems = empty;

function readCart(): CartItem[] {
	let raw: string | null;
	try {
		raw = localStorage.getItem(key);
	} catch {
		return cachedItems;
	}
	if (raw === cachedRaw) return cachedItems;
	cachedRaw = raw;
	try {
		const parsed: unknown = JSON.parse(raw ?? "[]");
		const quantities = new Map<string, number>();
		if (Array.isArray(parsed))
			for (const item of parsed) {
				if (
					item &&
					fragrances.some((product) => product.uid === item.uid) &&
					Number.isInteger(item.quantity) &&
					item.quantity > 0
				) {
					quantities.set(
						item.uid,
						Math.min(99, (quantities.get(item.uid) ?? 0) + item.quantity),
					);
				}
			}
		cachedItems = Array.from(quantities, ([uid, quantity]) => ({
			uid,
			quantity,
		}));
	} catch {
		cachedItems = empty;
	}
	return cachedItems;
}

function subscribe(listener: () => void) {
	window.addEventListener("storage", listener);
	window.addEventListener("cart-change", listener);
	return () => {
		window.removeEventListener("storage", listener);
		window.removeEventListener("cart-change", listener);
	};
}

function save(items: CartItem[]) {
	cachedItems = items;
	try {
		localStorage.setItem(key, JSON.stringify(items));
		cachedRaw = JSON.stringify(items);
	} catch {
		/* Keep the cart usable in memory when storage is unavailable. */
	}
	window.dispatchEvent(new Event("cart-change"));
}

export function addToCart(uid: string) {
	if (!fragrances.some((item) => item.uid === uid)) return;
	const items = readCart();
	const existing = items.find((item) => item.uid === uid);
	save(
		existing
			? items.map((item) =>
					item.uid === uid
						? { ...item, quantity: Math.min(99, item.quantity + 1) }
						: item,
				)
			: [...items, { uid, quantity: 1 }],
	);
}

export function setQuantity(uid: string, quantity: number) {
	if (!Number.isInteger(quantity) || quantity < 0 || quantity > 99) return;
	save(
		readCart()
			.map((item) => (item.uid === uid ? { ...item, quantity } : item))
			.filter((item) => item.quantity > 0),
	);
}

export function clearCart() {
	save([]);
}
export function useCart() {
	return useSyncExternalStore(subscribe, readCart, () => empty);
}

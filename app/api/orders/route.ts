import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import fragrances from "@/data/fragrance.json";

export const runtime = "nodejs";

const MAX_REQUEST_SIZE = 16_384;

type OrderItemInput = {
	uid: string;
	quantity: number;
};

type DeliveryInput = {
	name: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	postalCode: string;
	country: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function cleanText(value: unknown, maxLength: number) {
	if (typeof value !== "string") return null;
	const cleaned = value.replace(/\s+/g, " ").trim();
	return cleaned && cleaned.length <= maxLength ? cleaned : null;
}

function parseDelivery(value: unknown): DeliveryInput | null {
	if (!isRecord(value)) return null;
	const delivery = {
		name: cleanText(value.name, 120),
		email: cleanText(value.email, 254),
		phone: cleanText(value.phone, 40),
		address: cleanText(value.address, 160),
		city: cleanText(value.city, 100),
		postalCode: cleanText(value.postalCode, 32),
		country: cleanText(value.country, 100),
	};
	if (Object.values(delivery).some((field) => field === null)) return null;
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(delivery.email!)) return null;
	return delivery as DeliveryInput;
}

function parseItems(value: unknown): OrderItemInput[] | null {
	if (
		!Array.isArray(value) ||
		value.length === 0 ||
		value.length > fragrances.length
	)
		return null;

	const quantities = new Map<string, number>();
	for (const item of value) {
		if (
			!isRecord(item) ||
			typeof item.uid !== "string" ||
			!Number.isInteger(item.quantity) ||
			(item.quantity as number) < 1 ||
			(item.quantity as number) > 99 ||
			!fragrances.some((product) => product.uid === item.uid)
		) {
			return null;
		}
		if (quantities.has(item.uid)) return null;
		quantities.set(item.uid, item.quantity as number);
	}

	return Array.from(quantities, ([uid, quantity]) => ({ uid, quantity }));
}

export async function POST(request: Request) {
	const contentLength = Number(request.headers.get("content-length") ?? 0);
	if (contentLength > MAX_REQUEST_SIZE) {
		return NextResponse.json(
			{ error: "Request is too large." },
			{ status: 413 },
		);
	}

	let body: unknown;
	try {
		const raw = await request.text();
		if (raw.length > MAX_REQUEST_SIZE) throw new Error("Request is too large.");
		body = JSON.parse(raw);
	} catch {
		return NextResponse.json({ error: "Invalid order data." }, { status: 400 });
	}

	if (!isRecord(body)) {
		return NextResponse.json({ error: "Invalid order data." }, { status: 400 });
	}

	const delivery = parseDelivery(body.delivery);
	const items = parseItems(body.items);
	if (!delivery || !items) {
		return NextResponse.json(
			{ error: "Please check the order details." },
			{ status: 400 },
		);
	}

	const orderItems = items.map((item) => {
		const product = fragrances.find((entry) => entry.uid === item.uid)!;
		return {
			uid: product.uid,
			title: product.title,
			quantity: item.quantity,
			unitPrice: product.price,
			lineTotal: product.price * item.quantity,
		};
	});
	const total = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
	const id = crypto.randomUUID();
	const order = {
		id,
		createdAt: new Date().toISOString(),
		status: "received",
		currency: "USD",
		items: orderItems,
		total,
		delivery,
	};

	try {
		const configuredDirectory = process.env.ORDER_DATA_DIR ?? ".runtime/orders";
		const orderDirectory = path.resolve(
			/*turbopackIgnore: true*/ process.cwd(),
			configuredDirectory,
		);
		await mkdir(orderDirectory, { recursive: true });
		await appendFile(
			path.join(orderDirectory, "orders.jsonl"),
			`${JSON.stringify(order)}\n`,
			"utf8",
		);
	} catch (error) {
		console.error("Failed to persist order", error);
		return NextResponse.json(
			{ error: "The order could not be saved. Please try again." },
			{ status: 500 },
		);
	}

	const response = NextResponse.json({ id }, { status: 201 });
	response.cookies.set("order_receipt", id, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24,
		path: "/",
	});
	return response;
}

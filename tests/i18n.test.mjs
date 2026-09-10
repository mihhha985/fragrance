import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const loadDependency = createRequire(import.meta.url);
const ru = loadDependency("../data/ru.json");

function load(file, imports) {
	const source = ts.transpileModule(
		fs.readFileSync(path.join(__dirname, "..", file), "utf8"),
		{
			compilerOptions: {
				module: ts.ModuleKind.CommonJS,
				target: ts.ScriptTarget.ES2020,
				esModuleInterop: true,
			},
		},
	).outputText;
	const context = {
		exports: {},
		require: (name) => imports[name] ?? loadDependency(name),
	};
	vm.runInNewContext(source, context);
	return context.exports;
}

const i18n = load("utils/i18n.ts", { "@/data/ru.json": ru });
const { proxy } = load("proxy.ts", { "@/utils/i18n": i18n });
const { NextRequest } = loadDependency("next/server");

test("locale switching preserves route, query and fragment without changing external links", () => {
	assert.equal(
		i18n.localizedPath("/en/fragrance/terra?from=quiz#details", "ru"),
		"/ru/fragrance/terra?from=quiz#details",
	);
	assert.equal(i18n.localizedPath("/ru/cart", "en"), "/en/cart");
	assert.equal(i18n.localizedPath("/", "ru"), "/ru");
	for (const href of [
		"#details",
		"https://example.com",
		"//example.com",
		"mailto:demo@example.com",
	]) {
		assert.equal(i18n.localizedPath(href, "ru"), href);
	}
});

test("browser negotiation respects region, quality, exclusions and fallback", () => {
	assert.equal(i18n.preferredLocale("ru-RU, en;q=0.8"), "ru");
	assert.equal(i18n.preferredLocale("ru;q=0.2,en-GB;q=0.9"), "en");
	assert.equal(i18n.preferredLocale("ru;q=0,en;q=0.5"), "en");
	assert.equal(i18n.preferredLocale("de,ru;q=0.7"), "ru");
	assert.equal(i18n.preferredLocale(null), "en");
	assert.equal(i18n.isLocale("fr"), false);
});

test("legacy URLs redirect to the chosen language and explicit localized URLs stay unchanged", () => {
	const response = proxy(
		new NextRequest("https://example.com/cart?from=shop", {
			headers: { "accept-language": "ru-RU", cookie: "locale=en" },
		}),
	);
	assert.equal(response.status, 307);
	assert.equal(
		response.headers.get("location"),
		"https://example.com/en/cart?from=shop",
	);
	assert.equal(
		proxy(
			new NextRequest("https://example.com/", {
				headers: { "accept-language": "ru" },
			}),
		).headers.get("location"),
		"https://example.com/ru",
	);
	assert.equal(
		proxy(
			new NextRequest("https://example.com/ru/cart", {
				headers: { cookie: "locale=en" },
			}),
		).headers.get("location"),
		null,
	);
});

test("all literal UI translations, product descriptions and quiz answers have Russian copy", () => {
	const keys = new Set();
	for (const dir of ["app", "components"]) {
		for (const file of fs
			.readdirSync(path.join(__dirname, "..", dir), { recursive: true })
			.filter((file) => file.endsWith(".tsx"))) {
			const name = path.join(__dirname, "..", dir, file);
			const source = ts.createSourceFile(
				name,
				fs.readFileSync(name, "utf8"),
				ts.ScriptTarget.Latest,
				true,
				ts.ScriptKind.TSX,
			);
			function visit(node) {
				if (
					ts.isCallExpression(node) &&
					node.expression.getText(source) === "t" &&
					node.arguments[0] &&
					ts.isStringLiteral(node.arguments[0])
				)
					keys.add(node.arguments[0].text);
				ts.forEachChild(node, visit);
			}
			visit(source);
		}
	}
	for (const product of loadDependency("../data/fragrance.json"))
		keys.add(product.description);
	const { quizQuestions } = load("types/quiz.ts", {});
	for (const question of quizQuestions) {
		keys.add(question.question);
		for (const answer of question.options) keys.add(answer.text);
	}
	for (const key of keys)
		assert.ok(
			ru[key.replace(/\s+/g, " ").trim()],
			`Missing translation: ${key}`,
		);
	assert.equal(i18n.getTranslator("en")("Your Bag"), "Your Bag");
	assert.equal(i18n.getTranslator("ru")("Your\n Bag"), "Ваша корзина");
});

import { cpSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);
const standaloneRoot = path.join(projectRoot, ".next", "standalone");

if (!existsSync(path.join(standaloneRoot, "server.js"))) {
	throw new Error("Standalone output is missing. Run next build first.");
}

cpSync(path.join(projectRoot, "public"), path.join(standaloneRoot, "public"), {
	recursive: true,
});
cpSync(
	path.join(projectRoot, ".next", "static"),
	path.join(standaloneRoot, ".next", "static"),
	{ recursive: true },
);

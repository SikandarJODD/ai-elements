import type { RequestHandler } from "./$types";
import { readFileSync } from "fs";
import { resolve } from "path";

export const GET: RequestHandler = async () => {
	const docsPath = resolve("src/routes/cookbook/getting-started/docs.md");
	const content = readFileSync(docsPath, "utf-8");

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};


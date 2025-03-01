import type { APIRoute } from "astro";
import { Hono } from "hono";
import { env } from "hono/adapter";

const app = new Hono()
	.basePath("/api")
	.get("/env", async (c) => {
		const { AUTH_USER } = env<{ AUTH_USER: string }>(c);
		return c.text(AUTH_USER);
	})
	.post("/article", async (c) => {
		return c.text("OK");
	});

export type App = typeof app;

export const GET: APIRoute = (context) => app.fetch(context.request);

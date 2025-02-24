// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			// Use react-dom/server.edge instead of react-dom/server.browser for React 19.
			// Without this, MessageChannel from node:worker_threads needs to be polyfilled.
			// TODO: wait for this PR: https://github.com/withastro/adapters/pull/436#issuecomment-2525190557
			alias: import.meta.env.PROD
				? {
						"react-dom/server": "react-dom/server.edge",
					}
				: undefined,
		},
	},
	output: "server",
	integrations: [react()],
	adapter: cloudflare(),
});

import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		draft: z.enum(["true", "false"]).transform((value) => value === "true"),
		title: z.string(),
		description: z.string(),
		pubDate: z
			.string()
			.regex(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/, "YYYY-MM-DD HH:mm形式で入力してください")
			.transform((str) => new Date(str)),
		updatedDate: z
			.string()
			.regex(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/, "YYYY-MM-DD HH:mm形式で入力してください")
			.transform((str) => new Date(str))
			.optional(),
	}),
});

export const collections = { blog };

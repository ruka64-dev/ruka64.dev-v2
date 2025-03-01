import type { APIRoute } from "astro";
import type { PostArticle } from "../../../types/LocalAPI";

function ResultRes(message: string, success: boolean = true, code: number = 200) {
	const json = JSON.stringify({
		success: success,
		message: message,
	});
	return new Response(json, {
		status: code,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export const POST: APIRoute = async (context) => {
	const runtime = context.locals.runtime;
	const { API_ENDPOINT } = runtime.env;
	const req = context.request;
	const { params } = context;
	const slug = params.slug ?? "";
	if (slug === "") {
		return ResultRes("fuck you", false, 500);
	}
	const { title, content, draft, isNew } = (await req.json()) as PostArticle;

	try {
		if (isNew) createArticle(API_ENDPOINT, title, slug, content, draft);
		else updateArticle(API_ENDPOINT, title, slug, content, draft);

		return ResultRes("OK");
	} catch (e) {
		console.log(e);
		return ResultRes(`${e}`, false, 500);
	}
};

async function createArticle(
	endpoint: string,
	title: string,
	slug: string,
	content: string,
	draft: boolean,
) {
	const response = await fetch(`${endpoint}/articles`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title,
			slug,
			draft,
			markdownContent: content,
		}),
	});

	if (!response.ok) {
		const json = await response.json();
		console.error("Failed", json);
	}

	return true;
}

async function updateArticle(
	endpoint: string,
	title: string,
	slug: string,
	content: string,
	draft: boolean,
) {
	const response = await fetch(`${endpoint}/articles/${slug}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: title,
			markdownContent: content,
			draft,
		}),
	});

	if (!response.ok) {
		const json = await response.json();
		console.error("Failed", json);
	}

	return true;
}

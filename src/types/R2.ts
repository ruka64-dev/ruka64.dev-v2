type Result = {
	success: boolean;
	message: string;
};

/**
 * NOTE: uploaded is unix date
 */
export type ArticleList = Result & {
	data: {
		id: string;
		title: string;
		description: string;
		draft: boolean;
		uploaded: number;
	}[];
};

/**
 * NOTE: createdAt is unix date
 */
export type GetArticle = Result & {
	data: {
		title: string;
		description: string;
		slug: string;
		draft: boolean;
		createdAt: string;
		updatedAt: string | null;
		markdownContent: string;
		content: string;
	};
};

export type OnError = {
	success: false;
	message: Error;
};

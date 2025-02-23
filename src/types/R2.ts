type Result = {
	success: boolean;
	message: string;
};

export type ArticleList = Result & {
	data: string[];
};

/**
 * NOTE: createdAt is unix date
 */
export type GetArticle = Result & {
	data: {
		title: string;
		slug: string;
		createdAt: string;
		content: string;
	};
};

export type OnError = {
	success: false;
	message: Error;
};

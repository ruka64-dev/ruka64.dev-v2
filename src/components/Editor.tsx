import React, { useState } from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import DOMPurify from "dompurify";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";

export default function Editor() {
	const marked = new Marked(
		markedHighlight({
			langPrefix: "hljs language-",
			highlight(code: string, lang: string) {
				const language = hljs.getLanguage(lang) ? lang : "plaintext";
				return hljs.highlight(code, { language }).value;
			},
		}),
	);
	const [markdownValue, setMarkdownValue] = useState("Initial value");

	const onChange = (value: string) => {
		setMarkdownValue(value);
	};

	return (
		<div className="flex flex-row justify-center">
			<SimpleMde className="bg-gray-900 w-full flex-1" value={markdownValue} onChange={onChange} />
			<div className="flex-1">
				<div
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(marked.parse(markdownValue) as string),
					}}
					className="w-full"
				></div>
			</div>
		</div>
	);
}

import DOMPurify from "dompurify";
import "easymde/dist/easymde.min.css";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { useState } from "react";
import SimpleMde from "react-simplemde-editor";
import "../styles/easymde-custom.css";

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
			<SimpleMde className="bg-black w-full flex-1 m-4" value={markdownValue} onChange={onChange} />
			<div className="flex-1 m-4">
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

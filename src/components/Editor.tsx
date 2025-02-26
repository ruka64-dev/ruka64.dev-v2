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
	const isDraft = document.getElementById("data-isdraft") || false;
	const mdContent =
		document.getElementById("md-content")?.getAttribute("data-content") || "Initial Text";
	const [markdownValue, setMarkdownValue] = useState(mdContent);

	const onChange = (value: string) => {
		setMarkdownValue(value);
	};

	return (
		<div>
			{isDraft && <p className="text-yellow-300 text-center">WARNING: This is Draft Article!</p>}
			<div className="flex flex-row justify-center">
				<button className="m-2 rounded-xl border-2 border-gray-200 py-1.5 px-2.5 text-center text-lg hover:text-gray-400 hover:border-gray-400">
					Button
				</button>
				<button className="m-2 rounded-xl border-2 border-gray-200 py-1.5 px-2.5 text-center text-lg hover:text-gray-400 hover:border-gray-400">
					Button
				</button>
				<button className="m-2 rounded-xl border-2 border-gray-200 py-1.5 px-2.5 text-center text-lg hover:text-gray-400 hover:border-gray-400">
					Button
				</button>
			</div>
			<div className="flex flex-row justify-center">
				<div className="w-full flex-1 m-4 border border-gray-400">
					<SimpleMde
						className="w-full"
						value={markdownValue}
						onChange={onChange}
					/>
				</div>
				<div className="flex-1 px-4 m-4 border border-gray-400">
					<div
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(marked.parse(markdownValue) as string),
						}}
						className="w-full"
					></div>
				</div>
			</div>
		</div>
	);
}

import DOMPurify from "dompurify";
import "easymde/dist/easymde.min.css";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { useState, type ChangeEventHandler } from "react";
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
	const isDraft = document.getElementById("data-isdraft") ? true : false;
	const mdContent =
		document.getElementById("md-content")?.getAttribute("data-content") || "Initial Text";

	const isNewPost = document.getElementById("md-content")?.getAttribute("data-content")
		? false
		: true;
	const [markdownValue, setMarkdownValue] = useState(mdContent);

	const onChange = (value: string) => {
		setMarkdownValue(value);
	};

	const SaveArticle = () => {
		console.log(draftState);
		console.log("Fire");
		console.log("isNew", isNewPost);
	};

	const valChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setDraftState(ev.target.checked);
		setButtonText(ev.target.checked ? "Save Draft" : "Deploy 🚀");
	};

	const [draftState, setDraftState] = useState(isDraft);

	const [buttonText, setButtonText] = useState(draftState ? "Save Draft" : "Deploy 🚀");

	return (
		<div>
			<div className="flex sticky top-0 box-border h-min bg-gray-950 text-xl break-words break-keep border-b-2 border-gray-900">
				<header className="flex w-full h-14 p-4 justify-between items-center text-white shrink-0">
					<h2>Article Editor</h2>
					<ul className="list-none flex gap-4">
						<li>
							<label className="flex items-center justify-self-center cursor-pointer h-full">
								<input
									type="checkbox"
									value=""
									defaultChecked={isDraft}
									className="sr-only peer"
									onChange={valChange}
								></input>
								<div className="relative w-11 h-6 bg-gray-700 rounded-full peer transition-colors peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
								<span className="ms-3 text-lg font-medium">Draft: {draftState ? "Yes" : "No"}</span>
							</label>
						</li>
						<li>
							<button
								className="h-full rounded-xl border border-gray-200 py-1 px-3.5 text-center text-lg hover:text-gray-400 hover:border-gray-400"
								onClick={SaveArticle}
							>
								{buttonText}
							</button>
						</li>
					</ul>
				</header>
			</div>

			{isNewPost && <p className="text-yellow-300 text-center">!! You writing new article !!</p>}
			<div className="flex flex-row justify-center">
				<div className="w-full flex-1 m-4 border border-gray-400">
					<SimpleMde className="w-full" value={markdownValue} onChange={onChange} />
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

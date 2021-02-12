import React, { useContext, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import styled from "styled-components";
import { Codepen as CodepenIcon } from "react-feather";
import ThemeContext from "../context/theme";

const CodepenWrap = styled.div`
	${({ height }) => `height: ${height}px`};
	${({ smHeight }) => `@media (min-width: 768px) { height: ${smHeight}px; }`};
`;

const Codepen = ({ height, smHeight, children }) => {
	const { themeName } = useContext(ThemeContext);
	const root = useRef();

	let codepenChildren = null;
	if (children) codepenChildren = children.length ? children : [children];

	useEffect(() => {
		window.__CPEmbed(root.current.querySelector(".codepen"));
	}, [themeName]);

	const renderForm = () => {
		const data = codepenChildren.reduce((obj, child) => {
			obj[child.props["data-lang"]] =
				child.props["data-lang"] === "html"
					? ReactDOMServer.renderToString(child.props.children)
					: child.props.children;
			return obj;
		}, {});

		data.html_classes = [themeName];
		data.stylesheets = [
			"https://cdn.jsdelivr.net/npm/hiq@4.1.4/dist/hiq.min.css",
			"https://6025dcd0a3059200081bdc97--jonathan-harrell.netlify.app/codepen.css"
		];

		return (
			<form action="https://codepen.io/pen/define" method="POST" target="_blank">
				<input type="hidden" name="data" value={JSON.stringify(data)} />
			</form>
		);
	};

	const viewOnCodepen = () => {
		root.current.querySelector("form").submit();
	};

	return codepenChildren ? (
		<>
			<div
				ref={root}
				className="relative overflow-hidden my-8 rounded-xl bg-gray-50 dark:bg-gray-800"
			>
				<button
					className="flex items-center absolute top-0 right-0 py-1 px-2 rounded-tr-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium text-gray-600 dark:text-gray-400"
					onClick={viewOnCodepen}
				>
					<CodepenIcon size={14} className="mr-1" />
					View it on Codepen
				</button>
				<div className="hidden">{renderForm()}</div>
				<CodepenWrap height={height} smHeight={smHeight}>
					<div
						className="codepen hidden"
						data-prefill={`{
						"html_classes": ["${themeName}"],
						"stylesheets": [
							"https://cdn.jsdelivr.net/npm/hiq@4.1.4/dist/hiq.min.css",
							"https://6025dcd0a3059200081bdc97--jonathan-harrell.netlify.app/codepen.css"
						]
					}`}
						data-height="100%"
						data-theme-id="39442"
						data-default-tab="result"
					>
						{codepenChildren.map((child, index) => (
							<pre key={index} data-lang={child.props["data-lang"]}>
								{child.props["data-lang"] === "html"
									? ReactDOMServer.renderToString(child.props.children)
									: child.props.children}
							</pre>
						))}
					</div>
				</CodepenWrap>
			</div>
		</>
	) : null;
};

export default Codepen;

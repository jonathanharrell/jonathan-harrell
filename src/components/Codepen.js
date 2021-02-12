import React, { useContext, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import ThemeContext from "../context/theme";

const Codepen = ({ children }) => {
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
			"https://60256b6cee186a00083be97f--jonathan-harrell.netlify.app/codepen.css"
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
			<div ref={root} className="my-8 bg-pink-400">
				<div>
					<span>Try it out!</span>
					<button onClick={viewOnCodepen}>View it on Codepen</button>
					<div className="hidden">{renderForm()}</div>
				</div>
				<div style={{ height: "300px" }}>
					<div
						className="codepen hidden"
						data-prefill={`{
						"html_classes": ["${themeName}"],
						"stylesheets": [
							"https://cdn.jsdelivr.net/npm/hiq@4.1.4/dist/hiq.min.css",
							"https://60256b6cee186a00083be97f--jonathan-harrell.netlify.app/codepen.css"
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
				</div>
			</div>
		</>
	) : null;
};

export default Codepen;

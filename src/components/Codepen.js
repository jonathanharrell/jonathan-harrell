import React, { useContext, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";
import ThemeContext from "../context/theme";

const Codepen = ({ id, children }) => {
	const { themeName } = useContext(ThemeContext);
	const root = useRef();

	useEffect(() => {
		window.__CPEmbed(root.current.querySelector(".codepen"));
	}, [themeName]);

	const css = `.dark { background-color: black; color: white }`;

	return (
		<div ref={root} className="my-8 border-4 border-gray-50 dark:border-gray-800">
			<div
				className="codepen hidden"
				data-prefill={`{
					"html_classes": ["${themeName}"],
					"stylesheets": "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
				}`}
				data-height="400"
				data-theme-id={themeName}
				data-default-tab="html,result"
			>
				<pre data-lang="html">{ReactDOMServer.renderToString(children)}</pre>
				<pre data-lang="css" dangerouslySetInnerHTML={{ __html: css }} />
			</div>
			{/*<iframe*/}
			{/*	ref={iframe}*/}
			{/*	height="500"*/}
			{/*	scrolling="no"*/}
			{/*	src={`//codepen.io/jonathanharrell/embed/${id}/?height=500&theme-id=${themeName}&default-tab=result&embed-version=2`}*/}
			{/*	frameBorder="no"*/}
			{/*	title="Codepen Embed"*/}
			{/*	className="w-full"*/}
			{/*/>*/}
		</div>
	);
};

Codepen.propTypes = {
	id: PropTypes.string.isRequired
};

export default Codepen;

import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Codepen as CodepenIcon } from "react-feather";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";
import ThemeContext from "../context/theme";

const fullConfig = resolveConfig(tailwindConfig);

const CodepenWrap = styled.div`
	${({ height }) => `height: ${height}px`};
	${({ smHeight }) => `@media (min-width: 768px) { height: ${smHeight}px; }`};
`;

const cleanupCode = code => code.replace(/\n/, "").replace(/^\t\t/gm, "");

const getGlobalCss = color => `/* Global styles for all Codepen examples */
:root {
	--primary-color: ${fullConfig.theme.colors[color]["400"]};
	--background-color: ${fullConfig.theme.colors.gray["50"]};
	--text-color: ${fullConfig.theme.colors.gray["900"]};
	--input-background-color: ${fullConfig.theme.colors.white};
	--input-border-color: ${fullConfig.theme.colors.gray["300"]};
	--input-disabled-background-color: ${fullConfig.theme.colors.gray["100"]};
	--input-placeholder-color: ${fullConfig.theme.colors.gray["600"]};
}

.dark {
	--background-color: ${fullConfig.theme.colors.gray["800"]};
	--text-color: ${fullConfig.theme.colors.gray["100"]};
	--input-background-color: ${fullConfig.theme.colors.gray["900"]};
	--input-border-color: ${fullConfig.theme.colors.gray["700"]};
	--input-disabled-background-color: ${fullConfig.theme.colors.gray["700"]};
	--input-placeholder-color: ${fullConfig.theme.colors.gray["400"]};
}

*,
*::before,
*::after {
	box-sizing: border-box;
}

html {
	font-family: ${fullConfig.theme.fontFamily.sans};
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-rendering: optimizeLegibility;
}

body {
	margin: 0;
	padding: 0;
	background-color: var(--background-color);
	color: var(--text-color);
}

.wrap {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	height: 100vh;
	overflow-y: auto;
	padding: 2rem;
}

/* Styles specific to this example */`;

const Codepen = ({
	color,
	title,
	height,
	smHeight,
	html,
	styles,
	js,
	babel,
	scripts = [],
	stylesheets = []
}) => {
	const { themeName } = useContext(ThemeContext);
	const root = useRef();

	if (html) html = html.replace(/\n/, "");
	if (styles) styles = cleanupCode(styles);
	if (js) js = cleanupCode(js);
	if (babel) babel = cleanupCode(babel);

	if (styles) {
		styles = `${getGlobalCss(color)}\n${styles}`;
	} else {
		styles = getGlobalCss(color);
	}

	useEffect(() => {
		window.__CPEmbed(root.current.querySelector(".codepen"));
	}, [themeName]);

	const renderForm = () => {
		const data = {};
		if (html) data.html = html;
		if (styles) data.css = styles;
		if (js) data.js = js;
		if (babel) data.js = babel;

		data.title = title;
		data.html_classes = [themeName];
		data.scripts = scripts;
		data.stylesheets = stylesheets;

		if (babel) data.js_pre_processor = "babel";

		return (
			<form action="https://codepen.io/pen/define" method="POST" target="_blank">
				<input type="hidden" name="data" value={JSON.stringify(data)} />
			</form>
		);
	};

	const viewOnCodepen = () => {
		root.current.querySelector("form").submit();
	};

	return (
		<div ref={root} className="relative overflow-hidden my-8 bg-gray-50 dark:bg-gray-800">
			<button
				className="flex items-center absolute top-0 right-0 p-2 text-sm font-medium text-gray-400 dark:text-gray-600"
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
						"scripts": [${scripts.map(script => `"${script}"`).join(",")}],
						"stylesheets": [${stylesheets.map(sheet => `"${sheet}"`).join(",")}]
					}`}
					data-height="100%"
					data-theme-id="39442"
					data-default-tab="result"
				>
					{html && <pre data-lang="html">{html}</pre>}
					{styles && <pre data-lang="css">{styles}</pre>}
					{js && <pre data-lang="js">{js}</pre>}
					{babel && <pre data-lang="babel">{babel}</pre>}
				</div>
			</CodepenWrap>
		</div>
	);
};

export default Codepen;

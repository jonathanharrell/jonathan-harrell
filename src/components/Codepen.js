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

const getGlobalCss = color => `
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
	align-items: center;
	justify-content: center;
	height: 100vh;
	padding: 2rem;
}

fieldset {
	margin: 0;
	padding: 0;
	border: 0;
}

label {
	display: block;
	margin-bottom: ${fullConfig.theme.margin[1.5]};
	font-weight: 600;
}

input {
	appearance: none;
	width: 100%;
	padding: ${fullConfig.theme.padding[2.5]} ${fullConfig.theme.padding[3.5]};
	border: 1px solid var(--input-border-color);
	border-radius: ${fullConfig.theme.borderRadius.md};
	background-color: var(--input-background-color);
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	font-size: ${fullConfig.theme.fontSize.lg[0]};
	color: inherit;
}

input:focus {
	outline: none;
	border-color: var(--primary-color) !important;
	box-shadow: 0 0 0 1px var(--primary-color), 0 1px 2px 0 rgba(0,0,0,0.05) !important;
}

input:disabled {
	background-color: var(--input-disabled-background-color);
	cursor: not-allowed;
}

input::placeholder {
	color: var(--input-placeholder-color);
}

.checkbox,
.radio {
	display: flex;
	align-items: center;
}

.checkbox label,
.radio label {
	margin-bottom: 0;
	margin-left: 0.5rem;
}

input[type="checkbox"],
input[type="radio"] {
	width: 1rem;
	height: 1rem;
	margin: 0;
	padding: 0;
}

input[type="checkbox"] {
	border-radius: ${fullConfig.theme.borderRadius.DEFAULT};
}

input[type="radio"] {
	border-radius: ${fullConfig.theme.borderRadius.full};
}

input[type="checkbox"]:checked,
input[type="radio"]:checked {
	border-color: var(--primary-color);
	background-color: var(--primary-color);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-position: center;
}

input[type="checkbox"]:checked {
	background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}

input[type="radio"]:checked {
	background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
}

input[type="checkbox"]:indeterminate {
	border-color: var(--primary-color);
	background-color: var(--primary-color);
	background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='2' x='4' y='7' rx='1'/%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-position: center;
}
`;

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
		<div
			ref={root}
			className="relative overflow-hidden my-8 rounded-xl bg-gray-50 dark:bg-gray-800"
		>
			<button
				className="flex items-center absolute top-0 right-0 py-1 px-2 rounded-tr-xl rounded-bl-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium text-gray-600 dark:text-gray-400"
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

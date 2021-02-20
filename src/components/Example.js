import React from "react";
import Codepen from "./Codepen";

const Example = ({ color, name, height, smHeight }) => {
	try {
		const html = require("../examples/" + name + ".html");
		if (!html) return null;

		const domparser = new DOMParser();
		const document = domparser.parseFromString(html, "text/html");

		const body = document.body.innerHTML;
		const title = document.title;

		let style = document.head.querySelector("style");
		if (style) style = style.innerHTML;

		const scripts = Array.from(document.head.querySelectorAll("script"))
			.filter(script => script.src)
			.map(script => script.src);

		const script = Array.from(document.head.querySelectorAll("script")).find(
			script => !script.src
		);

		let js, babel;

		if (script) {
			if (script.dataset.babel) babel = script.innerHTML;
			else js = script.innerHTML;
		}

		const stylesheets = Array.from(document.head.querySelectorAll("link"))
			.filter(link => link.rel === "stylesheet")
			.map(stylesheet => stylesheet.href);

		return (
			<Codepen
				color={color}
				title={title}
				height={height}
				smHeight={smHeight}
				html={body}
				styles={style}
				js={js}
				babel={babel}
				stylesheets={stylesheets}
				scripts={scripts}
			/>
		);
	} catch (error) {
		return null;
	}
};

export default Example;

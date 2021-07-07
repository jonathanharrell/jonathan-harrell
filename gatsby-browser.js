import React from "react";
import * as Sentry from "@sentry/browser";
import Root from "./src/components/Root";
import config from "./package.json";
import "./src/styles/global.css";

export const wrapRootElement = ({ element }) => <Root>{element}</Root>;

export const onClientEntry = () => {
	Sentry.init({
		dsn: process.env.GATSBY_SENTRY_DSN_URL,
		release: config.version
	});
	window.Sentry = Sentry;
};

export const onRouteUpdate = ({ prevLocation }) => {
	const scrollPosition = window.scrollY;

	if (prevLocation) {
		const navSkipLink = document.getElementById("nav-skip-link");
		if (navSkipLink) {
			setTimeout(() => {
				navSkipLink.focus();
				window.scrollTo(0, scrollPosition);
			}, 0);
		}
	}
};

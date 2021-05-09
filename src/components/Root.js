import React, { useEffect, useState } from "react";
import "focus-visible";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "../context/theme";

const Root = ({ children }) => {
	const [themeName, setThemeName] = useState();

	useEffect(() => {
		// set initial theme based on value set on window
		setThemeName(window.__theme);

		// set up listener for custom theme change event
		window.addEventListener("themeChange", event => {
			setThemeName(event.detail);
		});
	}, []);

	// allow user to manually change their theme
	const setTheme = themeName => {
		window.__setPreferredTheme(themeName);
	};

	return (
		<ThemeContext.Provider value={{ themeName, setTheme }}>
			<ErrorBoundary>{children}</ErrorBoundary>
		</ThemeContext.Provider>
	);
};

export default Root;

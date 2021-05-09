import React from "react";

const ThemeContext = React.createContext({
	themeName: null,
	setTheme: () => {}
});

export default ThemeContext;

import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/theme";

const ThemedImage = ({ src, alt, ...props }) => {
	const { themeName } = useContext(ThemeContext);
	const [srcToLoad, setSrcToLoad] = useState(src);

	useEffect(() => {
		if (themeName === "dark" && props["data-dark-src"]) {
			setSrcToLoad(props["data-dark-src"]);
		} else {
			setSrcToLoad(src);
		}
	}, [props, src, themeName]);

	return (
		<>
			<img src={srcToLoad} alt={alt} />
		</>
	);
};

export default ThemedImage;

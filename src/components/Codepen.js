import React, { useContext } from "react";
import PropTypes from "prop-types";
import ThemeContext from "../context/theme";

const Codepen = ({ id }) => {
	const { themeName } = useContext(ThemeContext);

	return (
		<div className="my-8 border-4 border-gray-50 dark:border-gray-800">
			<iframe
				height="500"
				scrolling="no"
				src={`//codepen.io/jonathanharrell/embed/preview/${id}/?height=500&theme-id=${themeName}&default-tab=result`}
				frameBorder="no"
				title="Codepen Embed"
				className="w-full"
			/>
		</div>
	);
};

Codepen.propTypes = {
	id: PropTypes.string.isRequired
};

export default Codepen;

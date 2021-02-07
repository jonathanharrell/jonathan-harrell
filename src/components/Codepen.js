import React from "react";
import PropTypes from "prop-types";

const Codepen = ({ id }) => {
	const theme = document.body.classList.contains("dark") ? "dark" : "light";

	return (
		<div className="my-8 border-4 border-gray-50 dark:border-gray-800">
			<iframe
				height="500"
				scrolling="no"
				src={`//codepen.io/jonathanharrell/embed/preview/${id}/?height=500&theme-id=${theme}&default-tab=result`}
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

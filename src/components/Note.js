import React from "react";
import PropTypes from "prop-types";
import themeColors from "../theme";

const Note = ({ type, color, children }) => (
	<div
		className={`mt-8 mb-12 px-8 py-6 border-l-4 ${themeColors[color].border} bg-gray-50 dark:bg-gray-800 sm:rounded-lg text-lg leading-relaxed`}
	>
		<p className="mb-2 text-base font-bold">Note</p>
		<p>{children}</p>
	</div>
);

Note.propTypes = {
	type: PropTypes.oneOf(["info", "warning", "danger"]).isRequired
};

Note.defaultProps = {
	type: "info"
};

export default Note;

import React from "react";
import PropTypes from "prop-types";
import { InformationCircleIcon } from "@heroicons/react/solid";

const Note = ({ type, color, children }) => (
	<div className="flex mt-8 mb-12 py-5 pl-5 pr-8 bg-green-50 bg-opacity-50 dark:bg-gray-800 rounded">
		<InformationCircleIcon className="flex-grow-0 flex-shrink-0 w-5 h-5 mt-0.5 mr-3 text-green-400" />
		<div>
			<p className="mb-1 font-semibold text-green-800 dark:text-green-400">Note:</p>
			<p className="text-green-700 dark:text-gray-400">{children}</p>
		</div>
	</div>
);

Note.propTypes = {
	type: PropTypes.oneOf(["info", "warning", "danger"]).isRequired
};

Note.defaultProps = {
	type: "info"
};

export default Note;

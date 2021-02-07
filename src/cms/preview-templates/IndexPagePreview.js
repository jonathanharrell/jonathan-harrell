import React from "react";
import PropTypes from "prop-types";
import previewStyle from "../preview-style";

const IndexPagePreview = ({ entry }) => {
	const experiments = entry.getIn(["data", "experiments"]);

	return (
		<div style={previewStyle}>
			<h1>{entry.getIn(["data", "title"])}</h1>
			<p>{entry.getIn(["data", "description"])}</p>
		</div>
	);
};

IndexPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func
	})
};

export default IndexPagePreview;

import React from "react";
import previewStyle from "../preview-style";

const BlogPostPreview = ({ entry, widgetFor }) => {
	return (
		<div style={previewStyle}>
			<h1>{entry.getIn(["data", "title"])}</h1>
			{widgetFor("body")}
		</div>
	);
};

export default BlogPostPreview;

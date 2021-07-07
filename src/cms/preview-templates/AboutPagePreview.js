import React from "react";
import previewStyle from "../preview-style";

const AboutPagePreview = ({ entry, widgetsFor, getAsset }) => {
	const projects = widgetsFor("involvement").getIn(["data", "project"]);
	const usages = widgetsFor("what-i-use").getIn(["data", "usage"]);
	const image = entry.getIn(["data", "bioimage"]);
	const imageAsset = getAsset(image).value;

	return (
		<div style={previewStyle}>
			{imageAsset && <img src={imageAsset} alt="" style={{ maxWidth: "100%" }} />}
			<h1>{entry.getIn(["data", "title"])}</h1>
			<p>{entry.getIn(["data", "bio"])}</p>
			<h2>{entry.getIn(["data", "involvement", "title"])}</h2>
			{projects && (
				<ul>
					{projects.map((project, index) => (
						<li key={index}>
							<strong>{project.toJSON().name}</strong>: {project.toJSON().description}
						</li>
					))}
				</ul>
			)}
			<h2>{entry.getIn(["data", "what-i-use", "title"])}</h2>
			{usages && (
				<dl>
					{usages.map((usage, index) => (
						<li key={index}>
							<strong>{usage.toJSON().name}</strong>:{" "}
							<a href={usage.toJSON().link}>{usage.toJSON().description}</a>
						</li>
					))}
				</dl>
			)}
		</div>
	);
};

export default AboutPagePreview;

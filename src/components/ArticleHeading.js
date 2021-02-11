import React from "react";
import { Link } from "react-feather";
import GithubSlugger from "github-slugger";
import themeColors from "../theme";

const slugger = new GithubSlugger();

const ArticleHeading = ({ color, children, ...props }) => {
	slugger.reset();
	const id = slugger.slug(children);

	// copy page URL including section anchor
	// visitor will be jumped down to the shared section
	const copyLink = event => {
		event.preventDefault();
		navigator.clipboard.writeText(event.currentTarget.href);
	};

	return (
		<div className="relative">
			<h2 id={id} {...props} style={{ scrollMarginTop: "1rem" }}>
				{children}
			</h2>
			<a
				href={`#${id}`}
				title="Copy link to this section"
				aria-labelledby={`${id}-label`}
				className={`hidden md:block absolute top-0 my-2 -ml-2 opacity-25 hover:opacity-100 ${themeColors[color].text} transform -translate-x-full`}
				onClick={copyLink}
			>
				<span id={`${id}-label`} className="sr-only">
					Link to this section
				</span>
				<Link />
			</a>
		</div>
	);
};

export default ArticleHeading;

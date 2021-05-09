import React from "react";
import kebabCase from "lodash/kebabCase";
import { Link } from "gatsby";

const ArticleExcerpt = ({ link, image, svg, date, title, excerpt, color, className, ...props }) => {
	const labelId = `${kebabCase(title)}-label`;
	const formattedDate = date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric"
	});

	return (
		<Link to={link} className={`block group ${className}`} {...props}>
			<article aria-labelledby={labelId}>
				<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
					<span className="sr-only">Article published date&nbsp;</span>
					{formattedDate}
				</p>
				<h3 id={labelId} className="text-xl font-bold leading-tight hover:underline">
					{title}
				</h3>
				<p className="mt-3 text-lg leading-normal text-gray-500 dark:text-gray-400">
					{excerpt}
				</p>
				<p
					className="inline-block mt-3 text-lg font-semibold text-green-500 hover:underline"
					style={{
						textUnderlineOffset: "1px",
						textDecorationThickness: "2px"
					}}
				>
					Read article
				</p>
			</article>
		</Link>
	);
};

ArticleExcerpt.defaultProps = {
	date: new Date()
};

export default ArticleExcerpt;

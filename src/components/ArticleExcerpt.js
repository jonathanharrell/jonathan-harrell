import React from "react";
import styled from "styled-components";
import kebabCase from "lodash/kebabCase";
import themeColors from "../theme";
import { Link } from "gatsby";

const Title = styled.h3`
	mark {
		background-color: rgba(0, 0, 0, 0.15);
		color: inherit;
	}
`;

const Excerpt = styled.p`
	mark {
		background-color: rgba(0, 0, 0, 0.15);
		color: inherit;
	}
`;

const ArticleExcerpt = ({ link, image, svg, date, title, excerpt, color, className, ...props }) => {
	const labelId = `${kebabCase(title)}-label`;
	const formattedDate = date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric"
	});

	return (
		<Link
			to={link}
			className={`block overflow-hidden p-8 rounded-xl bg-gradient-to-br ${themeColors[color].bgGradient} shadow-lg hover:shadow-xl transition-shadow group ${className}`}
			{...props}
		>
			<article aria-labelledby={labelId}>
				<div className={`${svg ? "grid" : ""} gap-8 grid-cols-5 items-center`}>
					<div className="col-span-5 md:col-span-3">
						<p className={`text-sm font-semibold ${themeColors[color].gradientText} text-shadow`}>
							<span className="sr-only">Article published date&nbsp;</span>
							{formattedDate}
						</p>
						<Title id={labelId} className="text-2xl font-bold leading-tight text-gray-100">
							{title}
						</Title>
						<Excerpt
							className={`mt-4 text-lg font-medium ${themeColors[color].gradientText} text-shadow leading-snug`}
						>
							{excerpt}
						</Excerpt>
						<span
							className={`inline-flex mt-4 py-2 px-4 rounded-xl ${themeColors[color].gradientButton} bg-gray-50 font-semibold text-gray-100 transition-colors duration-200 cursor-pointer`}
						>
							Read post
						</span>
					</div>
					{svg && (
						<figure
							dangerouslySetInnerHTML={{ __html: svg }}
							className="hidden md:block col-span-2 transform translate-x-1/5"
						/>
					)}
				</div>
			</article>
		</Link>
	);
};

ArticleExcerpt.defaultProps = {
	date: new Date()
};

export default ArticleExcerpt;

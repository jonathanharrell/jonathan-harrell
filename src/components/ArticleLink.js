import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ArticleExcerpt from "./ArticleExcerpt";

const ArticleLink = ({ title }) => {
	// we need to grab all articles and then filter by the title prop
	const {
		allMdx: { posts }
	} = useStaticQuery(graphql`
		query ArticleLinksQuery {
			allMdx(
				sort: { order: DESC, fields: [frontmatter___date] }
				filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
			) {
				posts: edges {
					node {
						excerpt(pruneLength: 150)
						id
						fields {
							slug
						}
						frontmatter {
							title
							description
							color
							date
						}
					}
				}
			}
		}
	`);

	const [{ node: post }] = posts.filter(post => post.node.frontmatter.title === title);

	return post ? (
		<div className="py-6 px-8 rounded-xl bg-gray-100 dark:bg-gray-800">
			<ArticleExcerpt
				link={post.fields.slug}
				date={new Date(post.frontmatter.date)}
				title={post.frontmatter.title}
				excerpt={post.frontmatter.description}
				color={post.frontmatter.color || "blue"}
			/>
		</div>
	) : null;
};

export default ArticleLink;

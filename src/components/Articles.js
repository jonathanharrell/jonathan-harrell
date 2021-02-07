import React from "react";
import { graphql, StaticQuery } from "gatsby";
import ArticleExcerpt from "./ArticleExcerpt";

const Articles = ({ posts }) => (
	<ul className="grid gap-6 grid-cols-1">
		{posts &&
			posts.map(({ node: post }) => (
				<li key={post.id}>
					<ArticleExcerpt
						link={post.fields.slug}
						title={post.frontmatter.title}
						excerpt={post.frontmatter.description}
						date={new Date(post.frontmatter.date)}
						color={post.frontmatter.color || "blue"}
						svg={
							post.frontmatter.featuredimage ? post.frontmatter.featuredimage.fields.markup : null
						}
					/>
				</li>
			))}
	</ul>
);

export default () => (
	<StaticQuery
		query={graphql`
			query ArticlesQuery {
				allMdx(
					sort: { order: DESC, fields: [frontmatter___date] }
					filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
				) {
					posts: edges {
						node {
							id
							fields {
								slug
							}
							frontmatter {
								title
								description
								date
								color
								featuredimage {
									fields {
										markup
									}
								}
							}
						}
					}
				}
			}
		`}
		render={({ allMdx: { posts } }) => {
			return <Articles posts={posts} />;
		}}
	/>
);

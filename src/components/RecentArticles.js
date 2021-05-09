import React from "react";
import { graphql, StaticQuery } from "gatsby";
import ArticleExcerpt from "./ArticleExcerpt";

const RecentArticles = ({ posts }) => (
	<ul className="grid gap-y-10 md:gap-y-8 gap-x-8 md:grid-cols-2">
		{posts.map(({ node: post }) => (
			<li key={post.id}>
				<ArticleExcerpt
					link={post.fields.slug}
					date={new Date(post.frontmatter.date)}
					title={post.frontmatter.title}
					excerpt={post.frontmatter.description}
					color={post.frontmatter.color || "blue"}
					className="h-full"
				/>
			</li>
		))}
	</ul>
);

const query = graphql`
	query RecentArticlesQuery {
		allMdx(
			limit: 4
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
`;

export default () => (
	<StaticQuery
		query={query}
		render={({ allMdx: { posts } }) => <RecentArticles posts={posts} />}
	/>
);

import React from "react";
import { graphql, StaticQuery } from "gatsby";
import ArticleExcerpt from "./ArticleExcerpt";

const RecentArticles = ({ posts }) => (
	<ul className="grid gap-6 grid-cols-2">
		{posts.map(({ node: post }) => (
			<li key={post.id} className="col-span-2 md:col-span-1">
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
			limit: 5
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

export default ({ currentPostId }) => (
	<StaticQuery
		query={query}
		render={({ allMdx: { posts } }) => {
			const filteredPosts = posts.filter(post => post.node.id !== currentPostId).slice(0, 4);

			return <RecentArticles posts={filteredPosts} />;
		}}
	/>
);
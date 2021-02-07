import React from "react";
import { graphql, Link } from "gatsby";
import Seo from "../components/seo";
import PageTitle from "../components/PageTitle";
import website from "../../website-config";
import Layout from "../components/Layout";
import ArticleExcerpt from "../components/ArticleExcerpt";

const TagRoute = ({
	location,
	data: {
		allMdx: { edges: posts }
	},
	pageContext: { tag }
}) => {
	const tagHeading = `${posts.length} post${posts.length === 1 ? "" : "s"} tagged with “${tag}”`;

	return (
		<Layout location={location}>
			<Seo
				title={`Posts tagged with “${tag}“ | ${website.titleAlt}`}
				pathname={location.pathname}
				description="Stay update to date on the latest developments in HTML, CSS and Javascript. Read Jonathan Harrell's blog for tips, tricks and techniques."
			/>
			<div className="container">
				<div className="max-w-3xl mx-auto py-24">
					<header>
						<div>
							<div>
								<PageTitle>
									<h1>{tagHeading}</h1>
								</PageTitle>
								<div>
									<Link to="/blog/" arrow={true} arrowPosition="left">
										See all articles
									</Link>
									<Link to="/tags/" arrow={true} arrowPosition="right">
										Browse all tags
									</Link>
								</div>
							</div>
						</div>
					</header>
					<section id="articles" aria-labelledby="articles-label">
						<div>
							<span className="sr-only">
								<h2 id="articles-label">Articles</h2>
							</span>
							<ul>
								{posts &&
									posts.map(({ node: post }) => (
										<li key={post.id}>
											<ArticleExcerpt
												link={post.fields.slug}
												svg={
													post.frontmatter.featuredimage
														? post.frontmatter.featuredimage.fields.markup
														: null
												}
												date={new Date(post.frontmatter.date)}
												title={post.frontmatter.title}
												excerpt={post.frontmatter.description}
												color={post.frontmatter.color || "blue"}
											/>
										</li>
									))}
							</ul>
						</div>
					</section>
				</div>
			</div>
		</Layout>
	);
};

export default TagRoute;

export const tagPageQuery = graphql`
	query TagPage($tag: String) {
		site {
			siteMetadata {
				title
			}
		}
		allMdx(
			limit: 1000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			edges {
				node {
					id
					fields {
						slug
					}
					frontmatter {
						title
						description
						color
						templateKey
						date
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
`;

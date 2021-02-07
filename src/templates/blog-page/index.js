import React from "react";
import { graphql } from "gatsby";
import website from "../../../website-config";
import Layout from "../../components/Layout";
import Seo from "../../components/seo";
import Articles from "../../components/Articles";

const description =
	"Stay update to date on the latest developments in HTML, CSS and Javascript. Read Jonathan Harrell's blog for tips, tricks and techniques.";

export const BlogIndexPageTemplate = ({ location, title, tags }) => {
	return (
		<Layout location={location}>
			<Seo
				title={`${title} | ${website.titleAlt}`}
				pathname={location.pathname}
				description={description}
			/>
			<div className="container">
				<div className="max-w-3xl mx-auto py-24">
					<header>
						<h1 className="sr-only">{title || "Articles"}</h1>
						<select name="" id="">
							{tags.map(tag => (
								<option key={tag.fieldValue} value={tag.fieldValue}>
									{tag.fieldValue}
								</option>
							))}
						</select>
					</header>
					<section>
						<Articles />
					</section>
				</div>
			</div>
		</Layout>
	);
};

const BlogIndexPage = ({ location, data: { post, allMdx } }) => {
	console.log(allMdx.tags);
	return (
		<BlogIndexPageTemplate location={location} title={post.frontmatter.title} tags={allMdx.tags} />
	);
};

export default BlogIndexPage;

export const blogPageQuery = graphql`
	query BlogPage {
		post: mdx(frontmatter: { templateKey: { eq: "blog-page" } }) {
			frontmatter {
				title
			}
		}
		allMdx(limit: 1000) {
			tags: group(field: frontmatter___tags) {
				fieldValue
				totalCount
			}
		}
	}
`;

import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import Articles from "../components/Articles";

const description =
	"Stay update to date on the latest developments in HTML, CSS and Javascript. Read Jonathan Harrell's blog for tips, tricks and techniques.";

export const BlogIndexPageTemplate = ({ location, tags }) => {
	return (
		<Layout location={location}>
			<Seo title="Articles" pathname={location.pathname} description={description} />
			<div className="container">
				<div className="max-w-3xl mx-auto py-24">
					<header>
						<h1 className="sr-only">Articles</h1>
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

const BlogIndexPage = ({
	location,
	data: {
		allMdx: { tags }
	}
}) => <BlogIndexPageTemplate location={location} tags={tags} />;

export default BlogIndexPage;

export const blogPageQuery = graphql`
	query BlogPage {
		allMdx(limit: 1000) {
			tags: group(field: frontmatter___tags) {
				fieldValue
				totalCount
			}
		}
	}
`;

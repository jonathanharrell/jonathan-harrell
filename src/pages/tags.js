import React from "react";
import { graphql, Link } from "gatsby";
import { kebabCase } from "lodash";
import Seo from "../components/seo";
import PageTitle from "../components/PageTitle";
import website from "../../website-config";
import Layout from "../components/Layout";

const TagsPage = ({
	location,
	data: {
		allMdx: { group: tags }
	}
}) => (
	<Layout location={location}>
		<Seo
			title={`Tags | ${website.titleAlt}`}
			pathname={location.pathname}
			description="Stay update to date on the latest developments in HTML, CSS and Javascript. Read Jonathan Harrell's blog for tips, tricks and techniques."
		/>
		<div className="container">
			<div className="max-w-3xl mx-auto py-24">
				<div>
					<header>
						<div>
							<PageTitle>
								<h1>Tags</h1>
							</PageTitle>
						</div>
					</header>
					<div id="tags" aria-labelledby="tags-label">
						<div>
							<ul>
								{tags.map(tag => (
									<li key={tag.fieldValue}>
										<Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
											<span className="sr-only">Go to tag</span>
										</Link>
										<h3>{tag.fieldValue}</h3>
										<p>{tag.totalCount} articles</p>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Layout>
);

export default TagsPage;

export const tagPageQuery = graphql`
	query TagsQuery {
		site {
			siteMetadata {
				title
			}
		}
		allMdx(limit: 1000) {
			group(field: frontmatter___tags) {
				fieldValue
				totalCount
			}
		}
	}
`;

import React, { useEffect, useRef } from "react";
import { graphql, Link } from "gatsby";
import Seo from "../components/seo";
import PageTitle from "../components/PageTitle";
import RecentArticles from "../components/RecentArticles";
import init from "../home-animation";
import Layout from "../components/Layout";

export const IndexPageTemplate = ({ location, title, description, experiments }) => {
	const canvasRef = useRef(0);

	useEffect(() => {
		let destroy;

		if (canvasRef.current) {
			destroy = init(canvasRef.current);
		}

		return () => {
			if (destroy) destroy();
		};
	}, []);

	return (
		<Layout location={location}>
			<Seo />
			<div className="container">
				<div className="max-w-3xl mx-auto py-24">
					<header aria-labelledby="introduction-label">
						<PageTitle>
							<h1 id="introduction-label">{title}</h1>
						</PageTitle>
						<p>{description}</p>
						<Link to="/about">Learn more</Link>
					</header>
					<section aria-labelledby="recent-articles-label">
						<header>
							<h2 id="recent-articles-label">Recent Articles</h2>
							<Link to="/blog" arrow={true} aria-labelledby="view-all-articles-label">
								<span aria-hidden>View all</span>
								<span className="sr-only" id="view-all-articles-label">
									View all articles
								</span>
							</Link>
						</header>
						<RecentArticles />
					</section>
				</div>
			</div>
		</Layout>
	);
};

const IndexPage = ({
	location,
	data: {
		mdx: { frontmatter }
	}
}) => (
	<IndexPageTemplate
		location={location}
		title={frontmatter.title}
		description={frontmatter.description}
		experiments={frontmatter.experiments}
	/>
);

export default IndexPage;

export const pageQuery = graphql`
	query IndexPageTemplate {
		mdx(frontmatter: { templateKey: { eq: "index-page" } }) {
			frontmatter {
				title
				description
				experiments {
					id
					title
					date
				}
			}
		}
	}
`;

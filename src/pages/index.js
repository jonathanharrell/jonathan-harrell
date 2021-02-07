import React, { useEffect, useRef } from "react";
import { Link } from "gatsby";
import Seo from "../components/seo";
import PageTitle from "../components/PageTitle";
import RecentArticles from "../components/RecentArticles";
import init from "../home-animation";
import Layout from "../components/Layout";

export const IndexPage = ({ location }) => {
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
							<h1 id="introduction-label">UI/UX Designer & Front-End Engineer</h1>
						</PageTitle>
						<p>
							I’m a designer and developer committed to making the web a more empowering and
							accessible place. I create engaging user experiences and bring them to life through
							maintainable, high-quality code. I share what I’ve learned in my technical blog.
						</p>
						<Link to="/about">Learn more</Link>
					</header>
					<section aria-labelledby="recent-articles-label">
						<header>
							<h2 id="recent-articles-label">Recent Articles</h2>
							<Link to="/blog" aria-labelledby="view-all-articles-label">
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

export default IndexPage;

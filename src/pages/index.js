import React from "react";
import { Link } from "gatsby";
import Seo from "../components/seo";
import RecentArticles from "../components/RecentArticles";
import Layout from "../components/Layout";

export const IndexPage = ({ location }) => {
	return (
		<Layout location={location}>
			<Seo />
			<div className="container">
				<div className="max-w-3xl mx-auto py-24 sm:py-32">
					<header aria-labelledby="introduction-label">
						<h1
							id="introduction-label"
							className="mb-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-none"
						>
							UI/UX Designer & Front-End Engineer
						</h1>
						<p className="text-xl sm:text-2xl mb-10 text-gray-500 dark:text-gray-400">
							I’m a designer and developer committed to making the web a more
							empowering and accessible place. I create engaging user experiences and
							bring them to life through maintainable, high-quality code. I share what
							I’ve learned in my technical blog.
						</p>
					</header>
					<section aria-labelledby="recent-articles-label" className="mt-10 sm:mt-16">
						<header className="mb-4 sm:mb-6 flex items-baseline justify-between">
							<h2
								id="recent-articles-label"
								className="text-2xl sm:text-3xl font-bold tracking-tight"
							>
								Recent Articles
							</h2>
							<p>
								<Link
									to="/blog"
									aria-labelledby="view-all-articles-label"
									className="font-bold hover:text-gray-600 dark:hover:text-gray-300"
								>
									<span aria-hidden>View all</span>
									<span className="sr-only" id="view-all-articles-label">
										View all articles
									</span>
								</Link>
							</p>
						</header>
						<RecentArticles />
					</section>
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;

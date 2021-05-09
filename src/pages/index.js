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
				<div className="max-w-4xl mx-auto pt-20 pb-12">
					<header aria-labelledby="introduction-label">
						<h1
							id="introduction-label"
							className="mb-4 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-none"
						>
							UI/UX Designer & Front-End Engineer
						</h1>
						<p className="text-xl sm:text-2xl mb-10 sm:leading-normal text-gray-500 dark:text-gray-400">
							I’m a designer and developer committed to making the web a more
							empowering and accessible place. I create engaging user experiences and
							bring them to life through maintainable, high-quality code. I share what
							I’ve learned in my technical blog.
						</p>
					</header>
					<section aria-labelledby="recent-articles-label" className="mt-10 sm:mt-16">
						<header className="mb-12 pb-4 sm:pb-6 flex items-baseline justify-between border-b-2 border-gray-100 dark:border-gray-800">
							<h2
								id="recent-articles-label"
								className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
							>
								Recent articles
							</h2>
							<p>
								<Link
									to="/blog"
									aria-labelledby="view-all-articles-label"
									className="py-1 px-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded font-semibold text-gray-500 dark:text-gray-400"
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

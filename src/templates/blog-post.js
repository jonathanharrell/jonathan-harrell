import React, { useLayoutEffect, useRef } from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import colors from "tailwindcss/colors";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { motion, useViewportScroll } from "framer-motion";
import TypeMate from "typemate";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import Seo from "../components/seo";
import website from "../../website-config";
import Layout from "../components/Layout";
import TableOfContents from "../components/TableOfContents";
import ScrollToTop from "../components/ScrollToTop";
import ArticleShare from "../components/ArticleShare";

export const BlogPostTemplate = ({
	location,
	id,
	content,
	tags,
	title,
	description,
	color,
	date,
	image,
	socialImage,
	readingTime,
	slug,
	tableOfContents,
	prev,
	next
}) => {
	const { scrollYProgress } = useViewportScroll();
	const articleWrap = useRef();
	const articleContent = useRef();

	useLayoutEffect(() => {
		const typeMateInstance = new TypeMate(articleWrap.current, {
			selector: "h1, h2, h3, h4, h5, h6, p"
		});
		typeMateInstance.apply();
	}, []);

	return (
		<Layout location={location} color={color}>
			<Seo
				title={`${title} | ${website.titleAlt}`}
				pathname={location.pathname}
				description={description}
				banner={socialImage ? socialImage.publicURL : undefined}
				publicationDate={date}
				article
			/>
			<article ref={articleWrap} aria-labelledby="article-title">
				<div className="container">
					<div className="fixed top-0 left-0 w-full z-10">
						<motion.div
							className="w-full height-1 origin-top-left"
							style={{
								width: "100%",
								height: "0.2rem",
								background: colors.green["400"],
								scaleX: scrollYProgress
							}}
						/>
					</div>
					<header className="mb-12 text-center">
						<div className="max-w-3xl mx-auto pt-12 mb-4">
							<div className="mb-3">
								<h2 id="article-tags-label" className="sr-only">
									Article Tags
								</h2>
								<ul
									className="flex justify-center"
									aria-labelledby="article-tags-label"
								>
									{tags.map(tag => (
										<li
											key={tag + `tag`}
											className="mr-1.5 py-0.5 px-3 bg-green-50 dark:bg-gray-800 rounded-2xl text-sm text-green-700 dark:text-green-500 font-medium"
										>
											{tag}
										</li>
									))}
								</ul>
							</div>
							<h1 className="mb-4 text-3xl sm:text-5xl font-extrabold leading-none">
								{title}
							</h1>
							<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
								<span className="mr-4">
									<span className="sr-only">Article published date&nbsp;</span>
									{date}
								</span>
								<span>{readingTime.text}</span>
							</p>
						</div>
					</header>
					<section>
						<div className="relative">
							{tableOfContents.items.length && (
								<div className="hidden 2xl:block absolute left-0 top-0 h-full">
									<div
										className="sticky top-6 w-72"
										style={{ height: "calc(100vh - 40px)" }}
									>
										<div
											className={`w-full max-h-full overflow-y-auto p-6 pl-4 rounded-xl bg-gray-50 dark:bg-gray-800`}
										>
											<TableOfContents
												tableOfContents={tableOfContents}
												articleContent={articleContent}
												color={color}
											/>
										</div>
									</div>
								</div>
							)}
							<div ref={articleContent} className="max-w-3xl mx-auto">
								<MDXRenderer>{content}</MDXRenderer>
							</div>
						</div>
					</section>
					<footer className="my-16">
						<div className="max-w-3xl mx-auto">
							<div className="md:flex md:shadow-sm md:rounded-lg">
								{prev ? (
									<Link
										to={prev.fields.slug}
										className="flex flex-1 items-center justify-center mb-4 md:mb-0 py-1.5 px-4 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg md:rounded-tr-none md:rounded-br-none text-lg"
									>
										<ChevronLeftIcon className="w-5 h-5 mr-2 text-gray-400" />
										Previous article
									</Link>
								) : (
									<a className="flex flex-1 items-center justify-center mb-4 md:mb-0 py-1.5 px-4 bg-white border border-gray-200 rounded-lg md:rounded-tr-none md:rounded-br-none text-lg text-gray-400 cursor-not-allowed">
										<ChevronLeftIcon className="w-5 h-5 mr-2 text-gray-300" />
										Previous article
									</a>
								)}
								<ArticleShare location={location} title={title} slug={slug} />
								{next ? (
									<Link
										to={next.fields.slug}
										className="flex flex-1 items-center justify-center mt-4 md:mt-0 py-1.5 px-4 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg md:rounded-tl-none md:rounded-bl-none text-lg"
									>
										Next article
										<ChevronRightIcon className="w-5 h-5 ml-2 text-gray-400" />
									</Link>
								) : (
									<a className="flex flex-1 items-center justify-center mt-4 md:mt-0 py-1.5 px-4 bg-white border border-gray-200 rounded-lg md:rounded-tl-none md:rounded-bl-none text-lg text-gray-400 cursor-not-allowed">
										Next article
										<ChevronRightIcon className="w-5 h-5 ml-2 text-gray-300" />
									</a>
								)}
							</div>
						</div>
					</footer>
					<ScrollToTop />
				</div>
			</article>
		</Layout>
	);
};

export default ({ location, data: { mdx: post }, pageContext: { prev, next } }) => {
	return (
		<BlogPostTemplate
			location={location}
			id={post.id}
			content={post.body}
			tags={post.frontmatter.tags}
			title={post.frontmatter.title}
			description={post.frontmatter.description}
			color={post.frontmatter.color || "blue"}
			date={post.frontmatter.date}
			socialImage={post.frontmatter.socialimage}
			readingTime={post.fields.readingTime}
			slug={post.fields.slug}
			tableOfContents={post.tableOfContents}
			prev={prev}
			next={next}
		/>
	);
};

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		mdx(id: { eq: $id }) {
			id
			body
			frontmatter {
				date(formatString: "MMMM D, YYYY")
				title
				description
				color
				tags
				socialimage {
					publicURL
				}
			}
			fields {
				readingTime {
					text
				}
				slug
			}
			tableOfContents
		}
	}
`;

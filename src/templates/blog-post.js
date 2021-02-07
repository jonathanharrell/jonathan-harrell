import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import colors from "tailwindcss/colors";
import debounce from "lodash/debounce";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { ArrowUp, GitHub, Share, Twitter } from "react-feather";
import TypeMate from "typemate";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import Seo from "../components/seo";
import RecentArticles from "../components/RecentArticles";
import website from "../../website-config";
import Button from "../components/Button";
import Layout from "../components/Layout";
import themeColors from "../theme";
import PageTitle from "../components/PageTitle";

export const getProgressBarColor = color => {
	return colors[color] ? colors[color]["400"] : undefined;
};

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
	tableOfContents
}) => {
	const [scrolled, setScrolled] = useState(false);
	const [hasNavigatorShare, setHasNavigatorShare] = useState(false);
	const { scrollYProgress } = useViewportScroll();
	const articleWrap = useRef();

	const githubUrl = `https://github.com/jonathanharrell/jonathan-harrell/edit/master/src/content${slug}`;
	const re = new RegExp(/.+?(?=\/$)/);
	const [match] = githubUrl.match(re);
	const processedGithubUrl = `${match}.mdx`;

	const shareArticle = () => {
		try {
			navigator.share({
				title,
				url: `${window.location.origin}${slug}`
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleScroll = debounce(() => {
		setScrolled(window.scrollY > 100);
	}, 50);

	const scrollToTop = event => {
		event.preventDefault();
		window.scrollTo(0, 0);
		const navSkipLink = document.getElementById("nav-skip-link");
		if (navSkipLink) navSkipLink.focus();
	};

	useEffect(() => {
		setHasNavigatorShare(!!navigator.share);
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

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
				<div className="fixed top-0 left-0 w-full z-10">
					<motion.div
						className="w-full height-1 bg-red-500 origin-top-left"
						style={{
							width: "100%",
							height: "0.2rem",
							background: getProgressBarColor(color),
							scaleX: scrollYProgress
						}}
					/>
				</div>
				<header className={`overflow-hidden bg-gradient-to-br ${themeColors[color].bgGradient}`}>
					<div className="container">
						<div className="relative max-w-3xl mx-auto pt-24 sm:pt-36 pb-12">
							{image && (
								<figure
									dangerouslySetInnerHTML={{
										__html: image.fields.markup || undefined
									}}
									className="absolute bottom-0 right-0 opacity-30 transform translate-y-1 scale-125"
								/>
							)}
							<div className="relative">
								<div
									className={`flex flex-wrap mb-6 sm:mb-8 text-sm font-semibold capitalize ${themeColors[color].gradientText} text-shadow`}
								>
									{tags && (
										<div className="mr-6">
											<h2 id="article-tags-label" className="sr-only">
												Article Tags
											</h2>
											<ul className="flex items-center" aria-labelledby="article-tags-label">
												{tags.map((tag, index) => (
													<li key={tag + `tag`}>
														{tag}
														{index < tags.length - 1 ? <span className="mx-2">/</span> : ""}
													</li>
												))}
											</ul>
										</div>
									)}
									<span className="mr-6">
										<span className="sr-only">Article published date&nbsp;</span>
										{date}
									</span>
									<span>{readingTime.text}</span>
								</div>
								<PageTitle>
									<h1 className="mb-4 text-3xl sm:text-4xl font-medium text-gray-100">{title}</h1>
								</PageTitle>
								<p
									className={`text-lg sm:text-xl font-medium ${themeColors[color].gradientText} text-shadow`}
								>
									{description}
								</p>
							</div>
						</div>
					</div>
				</header>
				<section>
					<div className="container">
						<div className="py-12 sm:py-24">
							<div className="relative">
								{tableOfContents.items.length && (
									<div className="hidden 2xl:block absolute left-0 top-0 h-full">
										<div className="sticky top-4 w-72" style={{ height: "calc(100vh - 32px)" }}>
											<div
												className={`w-full max-h-full overflow-y-auto p-6 rounded-xl bg-gray-50 dark:bg-gray-800`}
											>
												<ul>
													{tableOfContents.items.map(item => (
														<li key={item.url} className="py-1">
															<a
																href={item.url}
																className={`text-base leading-tight opacity-50 hover:opacity-75`}
															>
																{item.title}
															</a>
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								)}
								<div className="max-w-3xl mx-auto">
									<MDXRenderer>{content}</MDXRenderer>
									<footer className="sm:flex items-center mt-12 pt-12 border-t border-gray-200 dark:border-gray-800 space-y-4 sm:space-y-0 sm:space-x-4">
										{hasNavigatorShare && (
											<Button className="w-full sm:w-auto" onClick={shareArticle}>
												<Share className={`mr-2 w-5 h-5 text-gray-400`} />
												<span>Share this article</span>
											</Button>
										)}
										{!hasNavigatorShare && location.href && (
											<Button
												href={`https://twitter.com/intent/tweet?text=${title}&url=${location.href}`}
												target="_blank"
												rel="noopener noreferrer"
												as="a"
												className="w-full sm:w-auto"
											>
												<Twitter className={`mr-2 w-5 h-5 text-gray-400`} />
												<span>Discuss on Twitter</span>
											</Button>
										)}
										{processedGithubUrl && (
											<Button
												href={processedGithubUrl}
												target="_blank"
												rel="noopener noreferrer"
												as="a"
												className="w-full sm:w-auto"
											>
												<GitHub className={`mr-2 w-5 h-5 text-gray-400`} />
												<span>Edit on Github</span>
											</Button>
										)}
									</footer>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-gray-50 dark:bg-gray-800">
					<div className="container">
						<div className="py-12 sm:py-24">
							<div className="max-w-3xl mx-auto">
								<div aria-labelledby="more-label">
									<h2
										id="more-label"
										className="mb-6 text-3xl font-semibold text-gray-600 dark:text-gray-300"
									>
										More Articles
									</h2>
									<RecentArticles currentPostId={id} />
								</div>
							</div>
						</div>
					</div>
				</section>
				{scrolled && (
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0, y: 100 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 100 }}
							transition={{
								type: "spring",
								stiffness: 50,
								mass: 0.2
							}}
							style={{
								position: "fixed",
								bottom: "1rem",
								right: "1rem"
							}}
						>
							<a
								href="#nav-skip-link"
								className="block p-2 rounded-lg bg-gray-700 shadow-lg hover:shadow-2xl text-gray-100 transform hover:-translate-y-0.5 transition-all ease-in-out duration-150"
								title="Scroll to top"
								onClick={scrollToTop}
							>
								<ArrowUp />
								<span className="sr-only">Scroll to top</span>
							</a>
						</motion.div>
					</AnimatePresence>
				)}
			</article>
		</Layout>
	);
};

export default ({ location, data: { mdx: post } }) => {
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
			image={post.frontmatter.featuredimage}
			socialImage={post.frontmatter.socialimage}
			readingTime={post.fields.readingTime}
			slug={post.fields.slug}
			tableOfContents={post.tableOfContents}
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
				featuredimage {
					publicURL
					fields {
						markup
					}
				}
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

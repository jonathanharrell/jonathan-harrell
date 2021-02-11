import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import colors from "tailwindcss/colors";
import debounce from "lodash/debounce";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { ArrowUp, GitHub, Share, Twitter } from "react-feather";
import TypeMate from "typemate";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import Seo from "../components/seo";
import website from "../../website-config";
import Button from "../components/Button";
import Layout from "../components/Layout";
import themeColors from "../theme";
import TableOfContents from "../components/TableOfContents";

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
	tableOfContents,
	prev,
	next
}) => {
	const [scrolled, setScrolled] = useState(false);
	const [activeSectionId, setActiveSectionId] = useState("");
	const [hasNavigatorShare, setHasNavigatorShare] = useState(false);
	const { scrollYProgress } = useViewportScroll();
	const articleWrap = useRef();
	const articleContent = useRef();

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

	const setActiveSection = () => {
		if (articleContent.current) {
			const headings = Array.from(articleContent.current.querySelectorAll("h2"));
			const visibleHeadings = headings.filter(heading => {
				const { bottom } = heading.getBoundingClientRect();
				return bottom <= (window.innerHeight || document.documentElement.clientHeight);
			});
			if (visibleHeadings.length) {
				setActiveSectionId(visibleHeadings[visibleHeadings.length - 1].id);
			} else {
				setActiveSectionId("");
			}
		}
	};

	const handleScroll = debounce(() => {
		//setScrolled(window.scrollY > 100);
		//setActiveSection();
	}, 50);

	const scrollToTop = event => {
		event.preventDefault();
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth"
		});
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
				<header
					className={`overflow-hidden bg-gradient-to-br ${themeColors[color].bgGradient}`}
				>
					<div className="container">
						<div className="relative max-w-3xl mx-auto pt-24 sm:pt-36 pb-12">
							{image && (
								<figure className="absolute bottom-0 right-0 opacity-30 transform translate-y-1 scale-125">
									<img src={image.publicURL} alt="" />
								</figure>
							)}
							<div className="relative">
								<div
									className={`flex flex-wrap mb-6 sm:mb-8 text-sm font-semibold ${themeColors[color].gradientText} text-shadow`}
								>
									{tags && (
										<div className="mr-6">
											<h2 id="article-tags-label" className="sr-only">
												Article Tags
											</h2>
											<ul
												className="flex items-center"
												aria-labelledby="article-tags-label"
											>
												{tags.map((tag, index) => (
													<li key={tag + `tag`}>
														{tag}
														{index < tags.length - 1 ? (
															<span className="mx-2 opacity-50">
																/
															</span>
														) : (
															""
														)}
													</li>
												))}
											</ul>
										</div>
									)}
									<span className="mr-6">
										<span className="sr-only">
											Article published date&nbsp;
										</span>
										{date}
									</span>
									<span>{readingTime.text}</span>
								</div>
								<h1 className="mb-4 text-3xl sm:text-5xl font-extrabold leading-none text-gray-100">
									{title}
								</h1>
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
										<div
											className="sticky top-6 w-72"
											style={{ height: "calc(100vh - 40px)" }}
										>
											<div
												className={`w-full max-h-full overflow-y-auto p-6 pl-4 rounded-xl bg-gray-50 dark:bg-gray-800`}
											>
												<TableOfContents
													tableOfContents={tableOfContents}
													activeSectionId={activeSectionId}
													color={color}
												/>
											</div>
										</div>
									</div>
								)}
								<div className="max-w-3xl mx-auto">
									<div ref={articleContent}>
										<MDXRenderer>{content}</MDXRenderer>
									</div>
									<footer className="mt-16">
										<div className="sm:flex space-y-6 sm:space-y-0 sm:space-x-6">
											{prev && (
												<Link
													to={prev.fields.slug}
													className="block flex-1 py-4 px-5 border border-gray-200 dark:border-gray-700 rounded-lg group"
												>
													<h3 className="mb-1 text-sm font-semibold">
														« Previous
													</h3>
													<p
														className={`text-lg leading-snug font-semibold opacity-75 group-hover:opacity-100 ${themeColors[color].text}`}
													>
														{prev.frontmatter.title}
													</p>
												</Link>
											)}
											{next && (
												<Link
													to={next.fields.slug}
													className="block flex-1 py-4 px-5 border border-gray-200 dark:border-gray-700 rounded-lg text-right group"
												>
													<h3 className="mb-1 text-sm font-semibold">
														Next »
													</h3>
													<p
														className={`text-lg leading-snug font-semibold opacity-75 group-hover:opacity-100 ${themeColors[color].text}`}
													>
														{next.frontmatter.title}
													</p>
												</Link>
											)}
										</div>
										<hr className="my-10 border-t border-gray-200 dark:border-gray-800" />
										<div className="sm:flex items-center space-y-4 sm:space-y-0 sm:space-x-4">
											{hasNavigatorShare && (
												<Button
													className="w-full sm:w-auto"
													onClick={shareArticle}
												>
													<Share
														className={`mr-2 w-5 h-5 text-gray-400`}
													/>
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
													<Twitter
														className={`mr-2 w-5 h-5 text-gray-400`}
													/>
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
													<GitHub
														className={`mr-2 w-5 h-5 text-gray-400`}
													/>
													<span>Edit on Github</span>
												</Button>
											)}
										</div>
									</footer>
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
			image={post.frontmatter.featuredimage}
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
				featuredimage {
					publicURL
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

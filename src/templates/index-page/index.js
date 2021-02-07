import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { motion } from "framer-motion";
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import Seo from "../../components/seo";
import PageTitle from "../../components/PageTitle";
import RecentArticles from "../../components/RecentArticles";
import init from "../../home-animation";
import { shouldAnimate } from "../../helpers";
import {
	Canvas,
	HeaderContentWrap,
	HeaderTextWrap,
	HeaderWrap,
	HomeContentWrap,
	HomeIllustration,
	RecentArticlesWrap
} from "./styles";
import HomeIllustrationSrc from "../../img/home-illustration.png";

export const IndexPageTemplate = ({ title, description, experiments }) => {
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
		<>
			<Seo />
			<HeaderWrap aria-labelledby="introduction-label">
				<HomeContentWrap>
					<HeaderContentWrap>
						{shouldAnimate() && (
							<Canvas
								ref={canvasRef}
								initial={{ opacity: 0, scale: 0.75, y: "-50%" }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ type: "spring", stiffness: 50, mass: 0.2 }}
								role="presentation"
							/>
						)}
						<noscript>
							<HomeIllustration src={HomeIllustrationSrc} alt="" role="presentation" />
						</noscript>
						<HeaderTextWrap>
							<motion.div
								initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
								animate={{ opacity: 1, y: 0 }}
								transition={{ type: "spring", stiffness: 50, mass: 0.1 }}
							>
								<PageTitle>
									<Heading level={1} id="introduction-label">
										{title}
									</Heading>
								</PageTitle>
							</motion.div>
							<motion.div
								initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 50,
									mass: 0.1,
									delay: 0.1
								}}
							>
								<Text>{description}</Text>
							</motion.div>
							<motion.div
								initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 50,
									mass: 0.1,
									delay: 0.2
								}}
							>
								<button order="accent" to="/about" as={GatsbyLink}>
									Learn more
								</button>
							</motion.div>
						</HeaderTextWrap>
					</HeaderContentWrap>
				</HomeContentWrap>
			</HeaderWrap>
			<RecentArticlesWrap aria-labelledby="recent-articles-label">
				<HomeContentWrap>
					<header>
						<motion.div
							initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								type: "spring",
								stiffness: 50,
								mass: 0.1,
								delay: 0.3
							}}
						>
							<Heading level={2} id="recent-articles-label">
								Recent Articles
							</Heading>
						</motion.div>
						<motion.div
							initial={shouldAnimate() ? { opacity: 0 } : false}
							animate={{ opacity: 1 }}
							transition={{
								type: "spring",
								stiffness: 50,
								mass: 0.1,
								delay: 0.4
							}}
						>
							<Link to="/blog" arrow={true} aria-labelledby="view-all-articles-label">
								<span aria-hidden>View all</span>
								<span className="sr-only" id="view-all-articles-label">
									View all articles
								</span>
							</Link>
						</motion.div>
					</header>
					<RecentArticles />
				</HomeContentWrap>
			</RecentArticlesWrap>
		</>
	);
};

IndexPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	experiments: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			date: PropTypes.string.isRequired
		})
	).isRequired
};

const IndexPage = ({
	data: {
		mdx: { frontmatter }
	}
}) => (
	<IndexPageTemplate
		title={frontmatter.title}
		description={frontmatter.description}
		experiments={frontmatter.experiments}
	/>
);

IndexPage.propTypes = {
	data: PropTypes.shape({
		mdx: PropTypes.shape({
			frontmatter: PropTypes.shape({
				title: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
				experiments: PropTypes.arrayOf(
					PropTypes.shape({
						id: PropTypes.string.isRequired,
						title: PropTypes.string.isRequired,
						date: PropTypes.string.isRequired
					})
				).isRequired
			}).isRequired
		}).isRequired
	}).isRequired
};

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

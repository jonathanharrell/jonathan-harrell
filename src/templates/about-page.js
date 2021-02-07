import React from "react";
import { graphql, Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import Seo from "../components/seo";
import PageTitle from "../components/PageTitle";
import website from "../../website-config";
import Layout from "../components/Layout";
import GatsbyImage from "gatsby-image";

export const Usage = ({ usage }) => {
	const IconComponent = require(`react-feather/dist/icons/${usage.icon}`).default;

	return (
		<article aria-labelledby={`${kebabCase(usage.name)}-name ${kebabCase(usage.name)}-description`}>
			<a href={usage.link} target="_blank" rel="noopener noreferrer">
				<span className="sr-only">Learn more</span>
			</a>
			<div>
				<div>
					<IconComponent color="var(--accent)" size={24} />
				</div>
				<dt id={`${kebabCase(usage.name)}-name`}>{usage.name}</dt>
				<dd id={`${kebabCase(usage.name)}-description`}>{usage.description}</dd>
			</div>
		</article>
	);
};

export const AboutPageTemplate = ({
	location,
	title,
	image,
	bio,
	involvement,
	whatIUse,
	skillset
}) => (
	<Layout location={location}>
		<Seo
			title={`${title} | ${website.titleAlt}`}
			pathname={location.pathname}
			description="Jonathan Harrell is a UI/UX designer and front-end developer. He specializes in and blogs about HTML and CSS. Learn more."
			banner={image.publicURL}
		/>
		<div className="container">
			<div className="max-w-3xl mx-auto py-24">
				<header aria-labelledby="about-label">
					<div>
						{image && (
							<figure>
								<GatsbyImage fluid={image.childImageSharp.fluid} alt="Jonathan Harrell" />
							</figure>
						)}
						<div>
							<PageTitle>
								<h1 id="about-label">{title || "About Jonathan"}</h1>
							</PageTitle>
							<p>{bio}</p>
						</div>
					</div>
				</header>
				{involvement.projects.length && (
					<section aria-labelledby="involvement-label">
						<header>
							<h2 id="involvement-label">{involvement.title || "Involvement"}</h2>
						</header>
						<ul>
							{involvement.projects.map((project, index) => (
								<li key={index}>
									<article aria-labelledby={`${kebabCase(project.name)}-name`}>
										<a href={project.link} target="_blank" rel="noopener noreferrer">
											<span className="sr-only">Learn more</span>
										</a>
										<div>
											<h3 id={`${kebabCase(project.name)}-name`}>{project.name}</h3>
											<p>{project.description}</p>
										</div>
									</article>
								</li>
							))}
						</ul>
					</section>
				)}
				{whatIUse.usages.length && (
					<section id="uses" aria-labelledby="uses-label">
						<header>
							<h2 id="uses-label">{whatIUse.title || "What I Use"}</h2>
						</header>
						<dl>
							<div>
								{whatIUse.usages.map((usage, index) => (
									<Usage key={index} usage={usage} />
								))}
							</div>
						</dl>
					</section>
				)}
				{skillset.skills.length && (
					<section aria-labelledby="skillset-label">
						<header>
							<h2 color="textInverse" id="skillset-label">
								{skillset.title || "Skillset"}
							</h2>
							<Link to="/resume">View resume</Link>
						</header>
						<ul>
							{skillset.skills.map((skill, index) => (
								<li key={index}>
									<p color="textInverse">{skill.name}</p>
								</li>
							))}
						</ul>
					</section>
				)}
			</div>
		</div>
	</Layout>
);

const AboutPage = ({ location, data: { mdx: post } }) => {
	const { title, bioimage, bio, involvement, whatIUse, skillset } = post.frontmatter;

	return (
		<AboutPageTemplate
			location={location}
			title={title}
			image={bioimage}
			bio={bio}
			involvement={involvement}
			whatIUse={whatIUse}
			skillset={skillset}
		/>
	);
};

export default AboutPage;

export const aboutPageQuery = graphql`
	query AboutPage {
		mdx(frontmatter: { templateKey: { eq: "about-page" } }) {
			frontmatter {
				title
				bioimage {
					childImageSharp {
						fluid(maxWidth: 590, quality: 75, srcSetBreakpoints: [340]) {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				}
				bio
				involvement {
					title
					projects: project {
						name
						description
						link
					}
				}
				whatIUse: what_i_use {
					title
					usages: usage {
						name
						description
						link
						icon
					}
				}
				skillset {
					title
					skills: skill {
						name
					}
				}
			}
		}
	}
`;

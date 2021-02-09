import React from "react";
import { graphql } from "gatsby";
import kebabCase from "lodash/kebabCase";
import Seo from "../components/seo";
import website from "../../website-config";
import Layout from "../components/Layout";
import GatsbyImage from "gatsby-image";

const description =
	"Jonathan Harrell is a UI/UX designer and front-end developer. He specializes in and blogs about HTML and CSS. Learn more.";

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

export const AboutPageTemplate = ({ location, title, image, bio, involvement, whatIUse }) => (
	<Layout location={location}>
		<Seo
			title={`${title} | ${website.titleAlt}`}
			pathname={location.pathname}
			description={description}
			banner={image.publicURL}
		/>
		<div className="container">
			<div className="max-w-3xl mx-auto py-20 sm:py-24">
				<header aria-labelledby="about-label" className="mb-16">
					<h1
						id="about-label"
						className="mb-10 text-5xl font-extrabold tracking-tight leading-none"
					>
						{title || "About Jonathan"}
					</h1>
					<div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{image && (
							<figure>
								<GatsbyImage
									fluid={image.childImageSharp.fluid}
									alt="Jonathan Harrell"
									className="rounded-xl"
								/>
							</figure>
						)}
						<div className="lg:col-span-2">
							<p className="text-xl mb-10 text-gray-500">{bio}</p>
						</div>
					</div>
				</header>
				{involvement.projects.length && (
					<section aria-labelledby="involvement-label" className="mt-10 sm:mt-12">
						<header className="mb-6">
							<h2 id="involvement-label" className="text-2xl sm:text-3xl font-bold tracking-tight">
								{involvement.title || "Involvement"}
							</h2>
						</header>
						<ul>
							{involvement.projects.map((project, index) => (
								<li key={index}>
									<article
										aria-labelledby={`${kebabCase(project.name)}-name`}
										className="p-8 rounded-xl bg-gray-100"
									>
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
			</div>
		</div>
	</Layout>
);

const AboutPage = ({ location, data: { mdx: post } }) => {
	const { title, bioimage, bio, involvement, whatIUse } = post.frontmatter;

	return (
		<AboutPageTemplate
			location={location}
			title={title}
			image={bioimage}
			bio={bio}
			involvement={involvement}
			whatIUse={whatIUse}
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
			}
		}
	}
`;

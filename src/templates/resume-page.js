import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { motion } from "framer-motion";
import Seo from "../components/seo";
import PageTitle from "../components/PageTitle";
import { shouldAnimate } from "../helpers";
import website from "../../website-config";
import Layout from "../components/Layout";

const ResumePageTemplate = ({
	location,
	title,
	history,
	education,
	skillset,
	tools,
	openSource
}) => (
	<Layout location={location}>
		<Seo
			title={`${title} | ${website.titleAlt}`}
			pathname={location.pathname}
			description="Jonathan Harrell is a UI/UX designer and front-end developer. He specializes in and blogs about HTML and CSS. Learn more."
		/>
		<div className="container">
			<div className="max-w-3xl mx-auto py-24">
				<header>
					<div>
						<motion.div
							initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
							animate={{ opacity: 1, y: 0 }}
							transition={{ type: "spring", stiffness: 50, mass: 0.1 }}
						>
							<div>
								<PageTitle title="Jonathan Harrell's Resume">
									<h1>Jonathan Harrell</h1>
								</PageTitle>
								<p>{title || "UI/UX Designer & Front-End Engineer"}</p>
							</div>
						</motion.div>
					</div>
				</header>
				<div>
					<section aria-labelledby="history-label">
						<span className="sr-only" element="h2" id="history-label">
							{history.title || "Employment History"}
						</span>
						{history.jobs.length && (
							<ul>
								{history.jobs.map((job, index) => (
									<li key={index}>
										<div>
											<p>{job.company}</p>
											<h3>{job.position}</h3>
											<div>
												<span className="sr-only">Accomplishments & Responsibilities</span>
												<MDXRenderer>{job.description}</MDXRenderer>
											</div>
											<span hoverable={false}>
												{job.startDate} – {job.endDate}
											</span>
										</div>
									</li>
								))}
							</ul>
						)}
					</section>
					<div>
						{education.description && (
							<section>
								<h2>{education.title || "Education"}</h2>
								<div>
									<MDXRenderer>{education.description}</MDXRenderer>
								</div>
							</section>
						)}
						{skillset.skills.length && (
							<section>
								<h2>{skillset.title || "Skillset"}</h2>
								<ul>
									{skillset.skills.map((skill, index) => (
										<li key={index}>{skill.name}</li>
									))}
								</ul>
							</section>
						)}
						{tools.tools.length && (
							<section>
								<h2>{tools.title || "Tools"}</h2>
								<ul>
									{tools.tools.map((tool, index) => (
										<li key={index}>{tool.name}</li>
									))}
								</ul>
							</section>
						)}
						{openSource.projects.length && (
							<section>
								<h2>{openSource.title || "Open-Source Projects"}</h2>
								<ul>
									{openSource.projects.map((project, index) => (
										<li key={index}>
											<a href={project.link} target="_blank" rel="noopener noreferrer">
												{project.name}
											</a>
										</li>
									))}
								</ul>
							</section>
						)}
						<section>
							<div>
								<a href="mailto:harr041@gmail.com">Contact me</a>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	</Layout>
);

const ResumePage = ({ location, data: { mdx: post, about } }) => {
	const { title, history, education, tools, openSource } = post.frontmatter;
	const { skillset } = about.frontmatter;

	return (
		<ResumePageTemplate
			location={location}
			title={title}
			history={history}
			education={education}
			skillset={skillset}
			tools={tools}
			openSource={openSource}
		/>
	);
};

export default ResumePage;

export const resumePageQuery = graphql`
	query ResumePage {
		mdx(frontmatter: { templateKey: { eq: "resume-page" } }) {
			frontmatter {
				title
				history {
					title
					jobs: job {
						company
						position
						startDate: startdate
						endDate: enddate
						description
					}
				}
				education {
					title
					description
				}
				tools {
					title
					tools: tool {
						name
					}
				}
				openSource: opensource {
					title
					projects: project {
						name
						link
					}
				}
			}
		}
		about: mdx(frontmatter: { templateKey: { eq: "about-page" } }) {
			frontmatter {
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

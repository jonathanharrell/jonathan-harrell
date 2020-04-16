import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { motion } from 'framer-motion'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Spaced from '../../jh-ui/Spaced'
import Tag from '../../jh-ui/Tag'
import Button from '../../jh-ui/Button'
import Seo from '../../components/seo'
import ContentWrap from '../../components/ContentWrap'
import PageTitle from '../../components/PageTitle'
import { shouldAnimate } from '../../helpers'
import website from '../../../website-config'
import {
  AdditionalInfoWrap,
  EducationDescription,
  EducationWrap,
  Header,
  HistoryList,
  HistoryWrap,
  Job,
  JobDescription,
  OpenSourceWrap,
  ProjectLink,
  ProjectsList,
  ResumeContentWrap,
  ResumeIndexWrap,
  SkillsetWrap,
  SkillsList,
  ToolsList,
  ToolsWrap
} from './styles'

const variants = {
  mounted: {
    transition: { staggerChildren: 0.05, delayChildren: 0.3 }
  }
}

const childVariants = {
  mounted: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      mass: 0.1
    }
  }
}

const ResumePageTemplate = ({
  location,
  title,
  history,
  education,
  skillset,
  tools,
  openSource
}) => (
  <>
    <Seo
      title={`${title} | ${website.titleAlt}`}
      pathname={location.pathname}
      description="Jonathan Harrell is a UI/UX designer and front-end developer. He specializes in and blogs about HTML and CSS. Learn more."
    />
    <ResumeIndexWrap>
      <Header>
        <ContentWrap>
          <Padded top="3x" bottom="xl">
            <motion.div
              initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
            >
              <div>
                <PageTitle title="Jonathan Harrell's Resume">
                  <Heading level={1}>Jonathan Harrell</Heading>
                </PageTitle>
                <Spaced top="xs">
                  <Text order="body" color="textLighter">
                    {title || 'UI/UX Designer & Front-End Engineer'}
                  </Text>
                </Spaced>
              </div>
            </motion.div>
          </Padded>
        </ContentWrap>
      </Header>
      <Padded bottom="3x">
        <ContentWrap>
          <ResumeContentWrap>
            <HistoryWrap>
              <section aria-labelledby="history-label">
                <ScreenReaderText element="h2" id="history-label">
                  {history.title || 'Employment History'}
                </ScreenReaderText>
                {history.jobs.length && (
                  <HistoryList animate="mounted" variants={variants}>
                    {history.jobs.map((job, index) => (
                      <Job
                        key={index}
                        variants={childVariants}
                        initial={
                          shouldAnimate() ? { opacity: 0, y: 50 } : false
                        }
                      >
                        <Padded vertical="xxl">
                          <div>
                            <Spaced bottom="xs">
                              <Text order="meta">{job.company}</Text>
                            </Spaced>
                            <Spaced bottom="m">
                              <Heading level={3}>{job.position}</Heading>
                            </Spaced>
                            <JobDescription>
                              <ScreenReaderText>
                                Accomplishments & Responsibilities
                              </ScreenReaderText>
                              <MDXRenderer>{job.description}</MDXRenderer>
                            </JobDescription>
                            <Spaced top="l">
                              <Tag hoverable={false}>
                                {job.startDate} – {job.endDate}
                              </Tag>
                            </Spaced>
                          </div>
                        </Padded>
                      </Job>
                    ))}
                  </HistoryList>
                )}
              </section>
            </HistoryWrap>
            <AdditionalInfoWrap>
              {education.description && (
                <EducationWrap>
                  <Padded vertical="xxl">
                    <div>
                      <Spaced bottom="m">
                        <motion.div
                          initial={
                            shouldAnimate() ? { opacity: 0, y: 50 } : false
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 50,
                            mass: 0.1,
                            delay: 0.05
                          }}
                        >
                          <Heading level={4} element="h2">
                            {education.title || 'Education'}
                          </Heading>
                        </motion.div>
                      </Spaced>
                      <motion.div
                        initial={
                          shouldAnimate()
                            ? {
                                opacity: 0,
                                y: 50
                              }
                            : false
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 50,
                          mass: 0.1,
                          delay: 0.1
                        }}
                      >
                        <EducationDescription>
                          <MDXRenderer>{education.description}</MDXRenderer>
                        </EducationDescription>
                      </motion.div>
                    </div>
                  </Padded>
                </EducationWrap>
              )}
              {skillset.skills.length && (
                <SkillsetWrap>
                  <Padded vertical="xxl">
                    <div>
                      <Spaced bottom="m">
                        <motion.div
                          initial={
                            shouldAnimate()
                              ? {
                                  opacity: 0,
                                  y: 50
                                }
                              : false
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 50,
                            mass: 0.1,
                            delay: 0.15
                          }}
                        >
                          <Heading level={4} element="h2">
                            {skillset.title || 'Skillset'}
                          </Heading>
                        </motion.div>
                      </Spaced>
                      <motion.div
                        initial={
                          shouldAnimate()
                            ? {
                                opacity: 0,
                                y: 50
                              }
                            : false
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 50,
                          mass: 0.1,
                          delay: 0.2
                        }}
                      >
                        <SkillsList>
                          {skillset.skills.map((skill, index) => (
                            <li key={index}>
                              <Text order="body" element="span">
                                {skill.name}
                              </Text>
                            </li>
                          ))}
                        </SkillsList>
                      </motion.div>
                    </div>
                  </Padded>
                </SkillsetWrap>
              )}
              {tools.tools.length && (
                <ToolsWrap>
                  <Padded vertical="xxl">
                    <div>
                      <Spaced bottom="m">
                        <motion.div
                          initial={
                            shouldAnimate()
                              ? {
                                  opacity: 0,
                                  y: 50
                                }
                              : false
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 50,
                            mass: 0.1,
                            delay: 0.25
                          }}
                        >
                          <Heading level={4} element="h2">
                            {tools.title || 'Tools'}
                          </Heading>
                        </motion.div>
                      </Spaced>
                      <motion.div
                        initial={
                          shouldAnimate()
                            ? {
                                opacity: 0,
                                y: 50
                              }
                            : false
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 50,
                          mass: 0.1,
                          delay: 0.3
                        }}
                      >
                        <ToolsList>
                          {tools.tools.map((tool, index) => (
                            <li key={index}>
                              <Text order="body" element="span">
                                {tool.name}
                              </Text>
                            </li>
                          ))}
                        </ToolsList>
                      </motion.div>
                    </div>
                  </Padded>
                </ToolsWrap>
              )}
              {openSource.projects.length && (
                <OpenSourceWrap>
                  <Padded vertical="xxl">
                    <div>
                      <Spaced bottom="m">
                        <motion.div
                          initial={
                            shouldAnimate()
                              ? {
                                  opacity: 0,
                                  y: 50
                                }
                              : false
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 50,
                            mass: 0.1,
                            delay: 0.35
                          }}
                        >
                          <Heading level={4} element="h2">
                            {openSource.title || 'Open-Source Projects'}
                          </Heading>
                        </motion.div>
                      </Spaced>
                      <motion.div
                        initial={
                          shouldAnimate()
                            ? {
                                opacity: 0,
                                y: 50
                              }
                            : false
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 50,
                          mass: 0.1,
                          delay: 0.4
                        }}
                      >
                        <ProjectsList>
                          {openSource.projects.map((project, index) => (
                            <li key={index}>
                              <ProjectLink
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {project.name}
                              </ProjectLink>
                            </li>
                          ))}
                        </ProjectsList>
                      </motion.div>
                    </div>
                  </Padded>
                </OpenSourceWrap>
              )}
              <section>
                <Padded vertical="xxl">
                  <div>
                    <motion.div
                      initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 50,
                        mass: 0.1,
                        delay: 0.45
                      }}
                    >
                      <Button
                        order="accent"
                        element="a"
                        href="mailto:harr041@gmail.com"
                      >
                        Contact me
                      </Button>
                    </motion.div>
                  </div>
                </Padded>
              </section>
            </AdditionalInfoWrap>
          </ResumeContentWrap>
        </ContentWrap>
      </Padded>
    </ResumeIndexWrap>
  </>
)

ResumePageTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  history: PropTypes.shape({
    title: PropTypes.string.isRequired,
    jobs: PropTypes.arrayOf(
      PropTypes.shape({
        company: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  education: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  tools: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tools: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  openSource: PropTypes.shape({
    title: PropTypes.string.isRequired,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  skillset: PropTypes.shape({
    title: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
}

const ResumePage = ({ location, data: { mdx: post, about } }) => {
  const { title, history, education, tools, openSource } = post.frontmatter
  const { skillset } = about.frontmatter

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
  )
}

ResumePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        history: PropTypes.shape({
          title: PropTypes.string.isRequired,
          jobs: PropTypes.arrayOf(
            PropTypes.shape({
              company: PropTypes.string.isRequired,
              position: PropTypes.string.isRequired,
              startDate: PropTypes.string.isRequired,
              endDate: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired
            })
          ).isRequired
        }).isRequired,
        education: PropTypes.shape({
          title: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired
        }).isRequired,
        tools: PropTypes.shape({
          title: PropTypes.string.isRequired,
          tools: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired
            })
          ).isRequired
        }).isRequired,
        openSource: PropTypes.shape({
          title: PropTypes.string.isRequired,
          projects: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired
            })
          ).isRequired
        }).isRequired
      }).isRequired
    }).isRequired,
    about: PropTypes.shape({
      frontmatter: PropTypes.shape({
        skillset: PropTypes.shape({
          title: PropTypes.string.isRequired,
          skills: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired
            })
          ).isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default ResumePage

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
`

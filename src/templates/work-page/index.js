import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link as GatsbyLink } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import { motion } from 'framer-motion'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import Padded from '../../jh-ui/Padded'
import Spaced from '../../jh-ui/Spaced'
import Button from '../../jh-ui/Button'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Seo from '../../components/seo'
import ContentWrap from '../../components/ContentWrap'
import PageTitle from '../../components/PageTitle'
import ProjectImage from '../../components/ProjectImage'
import website from '../../../website-config'
import { shouldAnimate } from '../../helpers'
import {
  Header,
  Project,
  ProjectContentWrap,
  ProjectImageWrap,
  ProjectText,
  WorkIndexWrap
} from './styles'

const variants = {
  mounted: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
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

export const WorkIndexPageTemplate = ({ location, title, projects }) => (
  <>
    <Seo
      title={`${title} | ${website.titleAlt}`}
      pathname={location.pathname}
      description="Stay update to date on the latest developments in HTML, CSS and Javascript. Read Jonathan Harrell's blog for tips, tricks and techniques."
    />
    <WorkIndexWrap>
      <Header>
        <ContentWrap>
          <Padded vertical="3x">
            <div>
              <motion.div
                initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
              >
                <PageTitle>
                  <Heading level={1}>{title || 'Work'}</Heading>
                </PageTitle>
              </motion.div>
            </div>
          </Padded>
        </ContentWrap>
      </Header>
      {projects.length && (
        <section>
          <Spaced bottom="5x">
            <motion.div animate="mounted" variants={variants}>
              {projects.map(({ node: project }, index) => (
                <Project
                  key={project.id}
                  variants={childVariants}
                  initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                  odd={(index + 1) % 2 !== 0}
                  aria-labelledby={`${kebabCase(
                    project.frontmatter.title
                  )}-label`}
                >
                  <ContentWrap>
                    <Padded vertical="3x">
                      <ProjectContentWrap>
                        <Spaced bottom="2x">
                          <ProjectImageWrap
                            shadow={project.frontmatter.image.shadow}
                            reverse={(index + 1) % 2 === 0}
                          >
                            <ProjectImage image={project.frontmatter.image} />
                          </ProjectImageWrap>
                        </Spaced>
                        <ProjectText reverse={(index + 1) % 2 === 0}>
                          <header>
                            <Text order="meta">{project.frontmatter.role}</Text>
                            <Heading
                              level={2}
                              id={`${kebabCase(
                                project.frontmatter.title
                              )}-label`}
                            >
                              {project.frontmatter.title}
                            </Heading>
                          </header>
                          <Spaced top="xl">
                            <Text>{project.frontmatter.description}</Text>
                            <Button
                              order="primary"
                              to={project.fields.slug}
                              as={GatsbyLink}
                            >
                              Learn more
                              <ScreenReaderText>
                                about this article
                              </ScreenReaderText>
                            </Button>
                          </Spaced>
                        </ProjectText>
                      </ProjectContentWrap>
                    </Padded>
                  </ContentWrap>
                </Project>
              ))}
            </motion.div>
          </Spaced>
        </section>
      )}
    </WorkIndexWrap>
  </>
)

WorkIndexPageTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        frontmatter: PropTypes.shape({
          title: PropTypes.string.isRequired,
          role: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          image: PropTypes.shape({
            light: PropTypes.shape({
              childImageSharp: PropTypes.shape({
                fluid: PropTypes.object.isRequired
              }).isRequired
            }).isRequired,
            dark: PropTypes.shape({
              childImageSharp: PropTypes.shape({
                fluid: PropTypes.object.isRequired
              }).isRequired
            }).isRequired,
            shadow: PropTypes.bool.isRequired
          }).isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  ).isRequired
}

const WorkIndexPage = ({
  location,
  data: {
    mdx: post,
    allMdx: { edges: projects }
  }
}) => {
  const { title } = post.frontmatter

  return (
    <WorkIndexPageTemplate
      location={location}
      title={title}
      projects={projects}
    />
  )
}

WorkIndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  mount: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired
            }).isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              role: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
              image: PropTypes.shape({
                light: PropTypes.shape({
                  childImageSharp: PropTypes.shape({
                    fluid: PropTypes.object.isRequired
                  }).isRequired
                }).isRequired,
                dark: PropTypes.shape({
                  childImageSharp: PropTypes.shape({
                    fluid: PropTypes.object.isRequired
                  }).isRequired
                }).isRequired,
                shadow: PropTypes.bool.isRequired
              }).isRequired
            }).isRequired
          }).isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  }).isRequired
}

export default WorkIndexPage

export const workPageQuery = graphql`
  query WorkPage {
    mdx(frontmatter: { templateKey: { eq: "work-page" } }) {
      frontmatter {
        title
      }
    }
    allMdx(
      sort: { order: ASC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "project" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            role
            description
            image: coverimage {
              light {
                childImageSharp {
                  fluid(maxWidth: 960, srcSetBreakpoints: [340, 680]) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              dark {
                childImageSharp {
                  fluid(maxWidth: 960, srcSetBreakpoints: [340, 680]) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              shadow
            }
          }
        }
      }
    }
  }
`

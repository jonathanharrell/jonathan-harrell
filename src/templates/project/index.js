import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { motion } from 'framer-motion'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import Spaced from '../../jh-ui/Spaced'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import Link from '../../jh-ui/Link'
import Seo from '../../components/seo'
import ContentWrap from '../../components/ContentWrap'
import PageTitle from '../../components/PageTitle'
import ProjectImage from '../../components/ProjectImage'
import website from '../../../website-config'
import { shouldAnimate } from '../../helpers'
import {
  Header,
  ProjectWrap,
  Section,
  SectionContentWrap,
  SectionDescription,
  SectionImageWrap,
  SectionTitle
} from './styles'

const variants = {
  mounted: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
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

export const ProjectTemplate = ({
  location,
  title,
  description,
  role,
  coverImage,
  sections
}) => (
  <>
    <Seo
      title={`${title} | ${website.titleAlt}`}
      pathname={location.pathname}
      description={description}
      banner={
        coverImage && coverImage.light ? coverImage.light.publicURL : undefined
      }
      article
    />
    <ProjectWrap>
      <Header>
        <ContentWrap>
          <Padded vertical="3x">
            <div>
              <motion.div
                initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
              >
                <Text order="meta">{role}</Text>
              </motion.div>
              <motion.div
                initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 50,
                  mass: 0.1,
                  delay: 0.1
                }}
              >
                <PageTitle>
                  <Heading level={1}>{title}</Heading>
                </PageTitle>
              </motion.div>
              <motion.div
                initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 50,
                  mass: 0.1,
                  delay: 0.2
                }}
              >
                <Spaced top="s">
                  <Link to="/work/" arrow={true} arrowPosition="left">
                    See all projects
                  </Link>
                </Spaced>
              </motion.div>
            </div>
          </Padded>
        </ContentWrap>
      </Header>
      {sections.length && (
        <section>
          <Spaced bottom="5x">
            <motion.div animate="mounted" variants={variants}>
              <ContentWrap>
                {sections.map((section, index) => (
                  <Padded key={index} vertical="2x">
                    <Section
                      variants={childVariants}
                      initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                    >
                      <SectionContentWrap>
                        <Spaced bottom="s">
                          <SectionTitle level={2}>{section.title}</SectionTitle>
                        </Spaced>
                        <Spaced bottom="2x">
                          <SectionDescription>
                            {section.description}
                          </SectionDescription>
                        </Spaced>
                        <SectionImageWrap shadow={section.image.shadow}>
                          <ProjectImage image={section.image} />
                        </SectionImageWrap>
                      </SectionContentWrap>
                    </Section>
                  </Padded>
                ))}
              </ContentWrap>
            </motion.div>
          </Spaced>
        </section>
      )}
    </ProjectWrap>
  </>
)

ProjectTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  coverImage: PropTypes.shape({
    light: PropTypes.shape({
      publicURL: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
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
        alt: PropTypes.string,
        shadow: PropTypes.bool.isRequired
      }).isRequired
    }).isRequired
  ).isRequired
}

const Project = ({ location, data: { mdx: post } }) => (
  <ProjectTemplate
    location={location}
    title={post.frontmatter.title}
    description={post.frontmatter.description}
    role={post.frontmatter.role}
    coverImage={post.frontmatter.coverImage}
    sections={post.frontmatter.sections}
  />
)

Project.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        coverImage: PropTypes.shape({
          light: PropTypes.shape({
            publicURL: PropTypes.string.isRequired
          }).isRequired
        }).isRequired,
        sections: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
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
              alt: PropTypes.string,
              shadow: PropTypes.bool.isRequired
            }).isRequired
          }).isRequired
        ).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default Project

export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        role
        coverImage: coverimage {
          light {
            publicURL
          }
        }
        sections: section {
          title
          description
          image: sectionimage {
            light {
              childImageSharp {
                fluid(
                  maxWidth: 960
                  quality: 100
                  srcSetBreakpoints: [340, 680]
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            dark {
              childImageSharp {
                fluid(
                  maxWidth: 960
                  quality: 100
                  srcSetBreakpoints: [340, 680]
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            alt
            shadow
          }
        }
      }
    }
  }
`

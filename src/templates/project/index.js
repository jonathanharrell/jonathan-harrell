import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'react-feather'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import Spaced from '../../jh-ui/Spaced'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import Link from '../../jh-ui/Link'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Seo from '../../components/seo'
import ContentWrap from '../../components/ContentWrap'
import PageTitle from '../../components/PageTitle'
import ProjectImage from '../../components/ProjectImage'
import ThemeContext from '../../context/theme'
import website from '../../../website-config'
import { shouldAnimate } from '../../helpers'
import {
  CloseButton,
  Header,
  LightThemeAlert,
  LightThemeAlertWrap,
  ProjectWrap,
  Section,
  SectionContentWrap,
  SectionDescription,
  SectionImageWrap,
  SectionTitle,
  ThemeAlertContentWrap
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
}) => {
  const { themeName, setTheme } = useContext(ThemeContext)
  const [themeAlertVisible, setThemeAlertVisible] = useState(false)

  useEffect(() => {
    try {
      const themeAlertDismissed = localStorage.getItem('themeAlertDismissed')
      setThemeAlertVisible(!themeAlertDismissed)
    } catch (error) {
      setThemeAlertVisible(true)
    }
  }, [])

  const swapTheme = event => {
    event.preventDefault()
    setTheme('light')
  }

  const dismissThemeAlert = () => {
    setThemeAlertVisible(false)
    localStorage.setItem('themeAlertDismissed', 'true')
  }

  return (
    <>
      <Seo
        title={`${title} | ${website.titleAlt}`}
        pathname={location.pathname}
        description={description}
        banner={
          coverImage && coverImage.light
            ? coverImage.light.publicURL
            : undefined
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
                        initial={
                          shouldAnimate() ? { opacity: 0, y: 50 } : false
                        }
                      >
                        <SectionContentWrap>
                          <Spaced bottom="s">
                            <SectionTitle level={2}>
                              {section.title}
                            </SectionTitle>
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
        <AnimatePresence>
          {themeName === 'dark' && themeAlertVisible && (
            <LightThemeAlertWrap
              initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
              style={{ x: '-50%' }}
            >
              <ContentWrap>
                <LightThemeAlert>
                  <Padded vertical="m" horizontal="xl">
                    <ThemeAlertContentWrap>
                      <Text>
                        <Link element="button" onClick={swapTheme}>
                          Swap themes
                        </Link>{' '}
                        to see light versions of these designs
                      </Text>
                      <CloseButton onClick={dismissThemeAlert}>
                        <ScreenReaderText>Dismiss Theme Alert</ScreenReaderText>
                        <X />
                      </CloseButton>
                    </ThemeAlertContentWrap>
                  </Padded>
                </LightThemeAlert>
              </ContentWrap>
            </LightThemeAlertWrap>
          )}
        </AnimatePresence>
      </ProjectWrap>
    </>
  )
}

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
          }).isRequired,
          publicURL: PropTypes.string.isRequired
        }).isRequired,
        dark: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.object.isRequired
          }).isRequired,
          publicURL: PropTypes.string.isRequired
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
                }).isRequired,
                publicURL: PropTypes.string.isRequired
              }).isRequired,
              dark: PropTypes.shape({
                childImageSharp: PropTypes.shape({
                  fluid: PropTypes.object.isRequired
                }).isRequired,
                publicURL: PropTypes.string.isRequired
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
                  quality: 75
                  srcSetBreakpoints: [340, 680]
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
              publicURL
            }
            dark {
              childImageSharp {
                fluid(
                  maxWidth: 960
                  quality: 75
                  srcSetBreakpoints: [340, 680]
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
              publicURL
            }
            alt
            shadow
          }
        }
      }
    }
  }
`

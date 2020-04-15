import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { motion } from 'framer-motion'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Spaced from '../../jh-ui/Spaced'
import Text from '../../jh-ui/Text'
import SectionHeader from '../../jh-ui/SectionHeader'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Seo from '../../components/seo'
import PageTitle from '../../components/PageTitle'
import website from '../../../website-config'
import { shouldAnimate } from '../../helpers'
import {
  AboutContentWrap,
  BioFigure,
  BioFigureWrap,
  BioImage,
  BioImageBorder,
  BioText,
  HeaderContentWrap,
  HeaderWrap,
  InvolvementWrap,
  Project,
  ProjectDescription,
  ProjectsWrap,
  ProjectTitle,
  ProjectWrap,
  Skill,
  SkillsetWrap,
  SkillsWrap,
  SkillWrap,
  UsageExcerpt,
  UsageLink,
  UsagesWrap,
  UsageWrap,
  UsesWrap
} from './styles'
import kebabCase from 'lodash/kebabCase'
import Link from '../../jh-ui/Link'

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

export const Usage = ({ usage }) => {
  const IconComponent = require(`react-feather/dist/icons/${usage.icon}`)
    .default

  return (
    <UsageExcerpt
      element="article"
      aria-labelledby={`${kebabCase(usage.name)}-name ${kebabCase(
        usage.name
      )}-description`}
    >
      <UsageLink href={usage.link} target="_blank" rel="noopener noreferrer">
        <ScreenReaderText>Learn more</ScreenReaderText>
      </UsageLink>
      <div>
        <Padded vertical="s">
          <div>
            <IconComponent color="var(--accent)" size={24} />
          </div>
        </Padded>
        <dt id={`${kebabCase(usage.name)}-name`}>
          <Text order="meta">{usage.name}</Text>
        </dt>
        <dd id={`${kebabCase(usage.name)}-description`}>
          <Text>{usage.description}</Text>
        </dd>
      </div>
    </UsageExcerpt>
  )
}

export const AboutPageTemplate = ({
  location,
  title,
  image,
  bio,
  involvement,
  whatIUse,
  skillset
}) => (
  <>
    <Seo
      title={`${title} | ${website.titleAlt}`}
      pathname={location.pathname}
      description="Jonathan Harrell is a UI/UX designer and front-end developer. He specializes in and blogs about HTML and CSS. Learn more."
      banner={image.publicURL}
    />
    <HeaderWrap aria-labelledby="about-label">
      <AboutContentWrap>
        <HeaderContentWrap>
          {image && (
            <BioFigureWrap>
              <BioFigure
                initial={shouldAnimate() ? { opacity: 0, scale: 0.75 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
              >
                <BioImage src={image.publicURL} alt="Jonathan Harrell" />
                {[1, 2].map(index => (
                  <BioImageBorder key={index}>
                    <circle
                      cx="50%"
                      cy="50%"
                      r="49%"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1"
                    />
                  </BioImageBorder>
                ))}
              </BioFigure>
            </BioFigureWrap>
          )}
          <BioText>
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
                <Heading level={1} id="about-label">
                  {title || 'About Jonathan'}
                </Heading>
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
              <Spaced top="m">
                <Text>{bio}</Text>
              </Spaced>
            </motion.div>
          </BioText>
        </HeaderContentWrap>
      </AboutContentWrap>
    </HeaderWrap>
    {involvement.projects.length && (
      <InvolvementWrap aria-labelledby="involvement-label">
        <motion.div
          initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 50, mass: 0.1, delay: 0.3 }}
        >
          <AboutContentWrap>
            <SectionHeader>
              <Heading level={2} id="involvement-label">
                {involvement.title || 'Involvement'}
              </Heading>
            </SectionHeader>
            <ProjectsWrap animate="mounted" variants={variants}>
              {involvement.projects.map((project, index) => (
                <ProjectWrap
                  key={index}
                  variants={childVariants}
                  initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                >
                  <Project hover={false}>
                    <ProjectTitle>
                      <Spaced bottom="s">
                        <Heading level={3}>{project.name}</Heading>
                      </Spaced>
                    </ProjectTitle>
                    <ProjectDescription>
                      {project.description}
                    </ProjectDescription>
                  </Project>
                </ProjectWrap>
              ))}
            </ProjectsWrap>
          </AboutContentWrap>
        </motion.div>
      </InvolvementWrap>
    )}
    {whatIUse.usages.length && (
      <UsesWrap id="uses" aria-labelledby="uses-label">
        <motion.div
          initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 50, mass: 0.1, delay: 0.4 }}
        >
          <AboutContentWrap>
            <SectionHeader>
              <Heading level={2} id="uses-label">
                {whatIUse.title || 'What I Use'}
              </Heading>
            </SectionHeader>
            <dl>
              <UsagesWrap animate="mounted" variants={variants}>
                {whatIUse.usages.map((usage, index) => (
                  <UsageWrap
                    key={index}
                    variants={childVariants}
                    initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                  >
                    <Usage usage={usage} />
                  </UsageWrap>
                ))}
              </UsagesWrap>
            </dl>
          </AboutContentWrap>
        </motion.div>
      </UsesWrap>
    )}
    {skillset.skills.length && (
      <SkillsetWrap aria-labelledby="skillset-label">
        <motion.div
          initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 50, mass: 0.1, delay: 0.5 }}
        >
          <AboutContentWrap>
            <SectionHeader>
              <Heading level={2} color="textInverse" id="skillset-label">
                {skillset.title || 'Skillset'}
              </Heading>
              <Link to="/resume" arrow={true}>
                View resume
              </Link>
            </SectionHeader>
            <SkillsWrap animate="mounted" variants={variants}>
              {skillset.skills.map((skill, index) => (
                <SkillWrap
                  key={index}
                  variants={childVariants}
                  initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                >
                  <Skill hover={false}>
                    <Heading level={3} color="textInverse" element="p">
                      {skill.name}
                    </Heading>
                  </Skill>
                </SkillWrap>
              ))}
            </SkillsWrap>
          </AboutContentWrap>
        </motion.div>
      </SkillsetWrap>
    )}
  </>
)

AboutPageTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    publicURL: PropTypes.string.isRequired
  }).isRequired,
  bio: PropTypes.string.isRequired,
  involvement: PropTypes.shape({
    title: PropTypes.string.isRequired,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  whatIUse: PropTypes.shape({
    title: PropTypes.string.isRequired,
    usages: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
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

const AboutPage = ({ location, data: { mdx: post } }) => {
  const {
    title,
    bioimage,
    bio,
    involvement,
    whatIUse,
    skillset
  } = post.frontmatter

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
  )
}

AboutPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        bioimage: PropTypes.shape({
          publicURL: PropTypes.string.isRequired
        }).isRequired,
        bio: PropTypes.string.isRequired,
        involvement: PropTypes.shape({
          title: PropTypes.string.isRequired,
          projects: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired
            })
          ).isRequired
        }).isRequired,
        whatIUse: PropTypes.shape({
          title: PropTypes.string.isRequired,
          usages: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
              link: PropTypes.string.isRequired,
              icon: PropTypes.string.isRequired
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
      }).isRequired
    }).isRequired
  }).isRequired
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage {
    mdx(frontmatter: { templateKey: { eq: "about-page" } }) {
      frontmatter {
        title
        bioimage {
          publicURL
        }
        bio
        involvement {
          title
          projects: project {
            name
            description
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
`

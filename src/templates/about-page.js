import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Padded from '../jh-ui/Padded'
import Heading from '../jh-ui/Heading'
import Spaced from '../jh-ui/Spaced'
import Text from '../jh-ui/Text'
import ContentWrap from '../components/ContentWrap'
import SectionHeader from '../jh-ui/SectionHeader'

const HeaderWrap = styled.section`
  padding-top: ${({ theme }) => theme.spacing['3x']};
  background-color: var(--backgroundPrimary);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
  }
`

const AboutContentWrap = styled(ContentWrap)`
  padding-top: ${({ theme }) => theme.spacing['3x']};
  padding-bottom: ${({ theme }) => theme.spacing['3x']};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
    padding-bottom: ${({ theme }) => theme.spacing['4x']};
  }
`

const HeaderContentWrap = styled.div`
  display: grid;
  grid-gap: 0 ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-gap: 0 ${({ theme }) => theme.spacing['3x']};
  }
`

const BioFigure = styled.figure`
  grid-column: 1 / -1;
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  padding: 50% 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 4;
    margin-bottom: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 2 / span 4;
  }
`

const BioImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

const BioText = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 5 / -1;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 6 / -2;
  }
`

const InvolvementWrap = styled.section`
  background-color: var(--backgroundSecondary);
`

const Involvement = styled.div`
  display: grid;
  grid-gap: 0 ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
  border-top: 1px solid var(--border);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-gap: 0 ${({ theme }) => theme.spacing['3x']};
  }
`

const InvolvementTitle = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 4;
  }
`

const InvolvementDescription = styled(Text)`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 6;
  }
`

const UsesWrap = styled.section`
  background-color: var(--backgroundPrimary);
`

const Usage = styled.div`
  display: grid;
  grid-gap: 0 ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
  border-top: 1px solid var(--border);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-gap: 0 ${({ theme }) => theme.spacing['3x']};
  }

  dt,
  dd {
    grid-column: 1 / -1;

    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
      grid-column: auto / span 6;
    }
  }

  dt p {
    font-weight: 600;

    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-weight: 400;
    }
  }
`

const UsageLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.m.mobile};
  color: var(--text);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.m.tablet};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.m.desktop};
  }

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }
`

export const AboutPageTemplate = ({ title, image, bio, involvement, whatIUse }) => {
  return (
    <>
      <HeaderWrap aria-labelledby="about-label">
        <AboutContentWrap>
          <HeaderContentWrap>
            {image && (
              <BioFigure>
                <BioImage src={image.publicURL} alt=""/>
              </BioFigure>
            )}
            <BioText>
              <Heading level={1} id="about-label">
                {title || 'About Jonathan'}
              </Heading>
              <Spaced top="m">
                <Text>
                  {bio}
                </Text>
              </Spaced>
            </BioText>
          </HeaderContentWrap>
        </AboutContentWrap>
      </HeaderWrap>
      <InvolvementWrap aria-labelledby="involvement-label">
        <AboutContentWrap>
          <SectionHeader>
            <Heading level={4} as="h2" id="involvement-label">
              {involvement.title || 'Involvement'}
            </Heading>
          </SectionHeader>
          <Padded vertical="l">
            {involvement.project.map((project, index) => (
              <Involvement key={index}>
                <InvolvementTitle>
                  <Spaced bottom="s">
                    <Heading level={3}>
                      {project.name}
                    </Heading>
                  </Spaced>
                </InvolvementTitle>
                <InvolvementDescription>
                  {project.description}
                </InvolvementDescription>
              </Involvement>
            ))}
          </Padded>
        </AboutContentWrap>
      </InvolvementWrap>
      <UsesWrap id="uses" aria-labelledby="uses-label">
        <AboutContentWrap>
          <SectionHeader>
            <Heading level={4} as="h2" id="uses-label">
              {whatIUse.title || 'What I Use'}
            </Heading>
          </SectionHeader>
          <dl>
            <Padded vertical="m">
              {whatIUse.usage.map((usage, index) => (
                <Usage key={index}>
                  <dt><Text>{usage.name}</Text></dt>
                  <dd><UsageLink href={usage.link}>{usage.description}</UsageLink></dd>
                </Usage>
              ))}
            </Padded>
          </dl>
        </AboutContentWrap>
      </UsesWrap>
    </>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  bio: PropTypes.string.isRequired,
  involvement: PropTypes.shape({
    title: PropTypes.string.isRequired,
    project: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  whatIUse: PropTypes.shape({
    title: PropTypes.string.isRequired,
    usage: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
}

const AboutPage = ({ data }) => {
  const { mdx: post } = data
  const { title, bioimage, bio, involvement, what_i_use: whatIUse } = post.frontmatter

  return (
    <Layout>
      <AboutPageTemplate
        title={title}
        image={bioimage}
        bio={bio}
        involvement={involvement}
        whatIUse={whatIUse}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage {
    mdx(frontmatter: {templateKey: {eq: "about-page"}}) {
      frontmatter {
        title
        bioimage {
          publicURL
        }
        bio
        involvement {
          title
          project {
            name
            description
          }
        }
        what_i_use {
          title
          usage {
            name
            description
            link
          }
        }
      }
    }
  }
`

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
  background-color: var(--backgroundPrimary);
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

export const AboutPageTemplate = ({ title, image }) => {
  console.log(image)
  return (
    <>
      <HeaderWrap aria-labelledby="about-label">
        <AboutContentWrap>
          <HeaderContentWrap>
            <BioFigure>
              <BioImage src={image.publicURL} alt=""/>
            </BioFigure>
            <BioText>
              <Heading level={1} id="about-label">
                About Jonathan
              </Heading>
              <Spaced top="m">
                <Text>
                  I’m a UI/UX designer and front-end developer working in Chicago, building websites and applications
                  for clients large and small. I’ve been interested in creating things on the web for most of my life,
                  but I’ve been working seriously at it for the last four years. From a technical standpoint, I spend
                  most of my time working with HTML, CSS and JavaScript. My true passion is the intersection point
                  between design and development, when something flat and static becomes a real, usable thing.
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
              Involvement
            </Heading>
          </SectionHeader>
          <Padded vertical="l">
            <Involvement>
              <InvolvementTitle>
                <Spaced bottom="s">
                  <Heading level={3}>
                    InVision
                  </Heading>
                </Spaced>
              </InvolvementTitle>
              <InvolvementDescription>
                InVision is my current work home. InVision is a digital product design platform that many of the
                world’s largest companies use to help create their products.
              </InvolvementDescription>
            </Involvement>
            <Involvement>
              <InvolvementTitle>
                <Spaced bottom="s">
                  <Heading level={3}>
                    HiQ
                  </Heading>
                </Spaced>
              </InvolvementTitle>
              <InvolvementDescription>
                I maintain a very lightweight CSS library that provides foundational styles for developers to quickly
                get started called HiQ.
              </InvolvementDescription>
            </Involvement>
            <Involvement>
              <InvolvementTitle>
                <Spaced bottom="s">
                  <Heading level={3}>
                    LogRocket
                  </Heading>
                </Spaced>
              </InvolvementTitle>
              <InvolvementDescription>
                Sometimes I write for the LogRocket blog, a great information resource for front-end developers.
                LogRocket is an advanced error tracking and session recording service.
              </InvolvementDescription>
            </Involvement>
          </Padded>
        </AboutContentWrap>
      </InvolvementWrap>
      <UsesWrap id="uses" aria-labelledby="uses-label">
        <AboutContentWrap>
          <SectionHeader>
            <Heading level={4} as="h2" id="uses-label">
              What I Use
            </Heading>
          </SectionHeader>
          <dl>
            <Padded vertical="m">
              <Usage>
                <dt><Text>IDE</Text></dt>
                <dd><Text>Webstorm</Text></dd>
              </Usage>
              <Usage>
                <dt><Text>Text Editor</Text></dt>
                <dd><Text>Visual Studio Code</Text></dd>
              </Usage>
              <Usage>
                <dt><Text>Terminal</Text></dt>
                <dd><Text>Hyper</Text></dd>
              </Usage>
              <Usage>
                <dt><Text>UI Design</Text></dt>
                <dd><Text>Sketch</Text></dd>
              </Usage>
              <Usage>
                <dt><Text>Backup</Text></dt>
                <dd><Text>Backblaze</Text></dd>
              </Usage>
              <Usage>
                <dt><Text>Backpack</Text></dt>
                <dd><Text>eBags Professional Slim</Text></dd>
              </Usage>
              <Usage>
                <dt><Text>Computer</Text></dt>
                <dd><Text>Macbook Pro</Text></dd>
              </Usage>
              <Usage>
                <dt><Text>Headphones</Text></dt>
                <dd><Text>Airpods</Text></dd>
              </Usage>
            </Padded>
          </dl>
        </AboutContentWrap>
      </UsesWrap>
    </>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string
}

const AboutPage = ({ data }) => {
  const { mdx: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        title={post.frontmatter.title}
        image={post.frontmatter.image}
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
        image {
          publicURL
        }
      }
    }
  }
`

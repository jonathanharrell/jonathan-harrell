import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ContentWrap from '../components/ContentWrap'
import RecentArticles from '../components/RecentArticles'
import ExperimentRoll from '../components/ExperimentRoll'
import Heading from '../jh-ui/Heading'
import Spaced from '../jh-ui/Spaced'
import Text from '../jh-ui/Text'
import Padded from '../jh-ui/Padded'
import Link from '../jh-ui/Link'
import SectionHeader from '../jh-ui/SectionHeader'
import ScreenReaderText from '../jh-ui/ScreenReaderText'

const HeaderWrap = styled.section`
  background-color: var(--backgroundPrimary);
`

const HeaderContentWrap = styled.div`
  max-width: 28rem;
`

const RecentArticlesWrap = styled.section`
  background-color: var(--backgroundSecondary);
`

const ExperimentRollWrap = styled.section`
  background-color: var(--backgroundInverse);
`

export const IndexPageTemplate = ({
                                    image,
                                    title,
                                    subheading
                                  }) => {

  return (
    <>
      <HeaderWrap aria-labelledby="introduction-label">
        <Padded vertical="3x">
          <ContentWrap>
            <HeaderContentWrap>
              <Heading level={1} id="introduction-label">
                UI/UX Designer & Front-End Developer
              </Heading>
              <Spaced top="m">
                <Text>
                  I’m a designer and developer who is passionate about creating great user experiences, crafting solid
                  code and overall making the web a better place.
                </Text>
              </Spaced>
            </HeaderContentWrap>
          </ContentWrap>
        </Padded>
      </HeaderWrap>
      <RecentArticlesWrap aria-labelledby="recent-articles-label">
        <Padded vertical="3x">
          <ContentWrap>
            <SectionHeader>
              <Heading level={2} id="recent-articles-label">
                Recent Articles
              </Heading>
              <Link
                to="/blog"
                arrow={true}
                aria-labelledby="view-all-articles-label"
              >
                <span aria-hidden>
                  View all
                </span>
                <ScreenReaderText id="view-all-articles-label">
                  View all articles
                </ScreenReaderText>
              </Link>
            </SectionHeader>
            <RecentArticles/>
          </ContentWrap>
        </Padded>
      </RecentArticlesWrap>
      <ExperimentRollWrap aria-labelledby="recent-experiments-label">
        <Padded vertical="3x">
          <ContentWrap>
            <SectionHeader>
              <Heading level={2} color="textInverse" id="recent-experiments-label">
                Recent Experiments
              </Heading>
              <Link
                href="https://codepen.io/jonathanharrell/"
                arrow={true}
                aria-labelledby="view-all-experiments-label"
              >
                <span aria-hidden>
                  View all
                </span>
                <ScreenReaderText id="view-all-experiments-label">
                  View all experiments
                </ScreenReaderText>
              </Link>
            </SectionHeader>
            <ExperimentRoll/>
          </ContentWrap>
        </Padded>
      </ExperimentRollWrap>
    </>
  )
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.mdx

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
    query IndexPageTemplate {
        mdx(frontmatter: {templateKey: {eq: "index-page"}}) {
            frontmatter {
                title
                heading
                subheading
                mainpitch {
                    title
                    description
                }
                description
                intro {
                    heading
                    description
                }
            }
        }
    }
`

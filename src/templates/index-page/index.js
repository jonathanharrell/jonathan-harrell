import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Heading from '../../jh-ui/Heading'
import Spaced from '../../jh-ui/Spaced'
import Text from '../../jh-ui/Text'
import Link from '../../jh-ui/Link'
import SectionHeader from '../../jh-ui/SectionHeader'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Seo from '../../components/seo'
import Layout from '../../components/Layout'
import RecentArticles from '../../components/RecentArticles'
import Experiments from '../../components/Experiments'
import init from '../../home-animation'
import {
  Canvas,
  ExperimentsWrap,
  HeaderContentWrap,
  HeaderTextWrap,
  HeaderWrap,
  HomeContentWrap,
  HomeIllustration,
  RecentArticlesWrap
} from './styles'
import HomeIllustrationSrc from '../../img/home-illustration.png'

export const IndexPageTemplate = ({ title, description, experiments }) => {
  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <Seo/>
      <HeaderWrap aria-labelledby="introduction-label">
        <HomeContentWrap>
          <HeaderContentWrap>
            <Canvas/>
            <noscript>
              <HomeIllustration src={HomeIllustrationSrc} alt=""/>
            </noscript>
            <HeaderTextWrap>
              <Heading level={1} id="introduction-label">
                {title}
              </Heading>
              <Spaced top="m">
                <Text>
                  {description}
                </Text>
              </Spaced>
            </HeaderTextWrap>
          </HeaderContentWrap>
        </HomeContentWrap>
      </HeaderWrap>
      <RecentArticlesWrap aria-labelledby="recent-articles-label">
        <HomeContentWrap>
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
        </HomeContentWrap>
      </RecentArticlesWrap>
      <ExperimentsWrap aria-labelledby="recent-experiments-label">
        <HomeContentWrap>
          <SectionHeader>
            <Heading level={2} color="textInverse" id="recent-experiments-label">
              Recent Experiments
            </Heading>
            <Link
              href="https://codepen.io/jonathanharrell/"
              target="_blank"
              rel="noopener noreferrer"
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
          <Experiments experiments={experiments}/>
        </HomeContentWrap>
      </ExperimentsWrap>
    </>
  )
}

IndexPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  experiments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })).isRequired
}

const IndexPage = ({ data: { mdx: { frontmatter } } }) => (
  <Layout>
    <IndexPageTemplate
      title={frontmatter.title}
      description={frontmatter.description}
      experiments={frontmatter.experiments}
    />
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        experiments: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired
        })).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    mdx(frontmatter: {templateKey: {eq: "index-page"}}) {
      frontmatter {
        title
        description
        experiments {
          id
          title
          date
        }
      }
    }
  }
`

import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { motion } from 'framer-motion'
import kebabCase from 'lodash/kebabCase'
import Heading from '../../jh-ui/Heading'
import Padded from '../../jh-ui/Padded'
import Tag from '../../jh-ui/Tag'
import Spaced from '../../jh-ui/Spaced'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import ContentWrap from '../../components/ContentWrap'
import PageTitle from '../../components/PageTitle'
import Articles from '../../components/Articles'
import Seo from '../../components/seo'
import website from '../../../website-config'
import { shouldAnimate } from '../../helpers'
import {
  ArticlesSkipLink,
  ArticlesWrap,
  BlogIndexWrap,
  Header,
  HeaderContentWrap,
  Link,
  TagWrap
} from './styles'

export const BlogIndexPageTemplate = ({ location, title, tags }) => {
  const articlesRef = useRef()

  const skipToArticles = () => {
    articlesRef.current.focus()
  }

  return (
    <>
      <Seo
        title={`${title} | ${website.titleAlt}`}
        pathname={location.pathname}
        description="Stay update to date on the latest developments in HTML, CSS and Javascript. Read Jonathan Harrell's blog for tips, tricks and techniques."
      />
      <BlogIndexWrap>
        <Header>
          <ContentWrap>
            <Padded vertical="3x">
              <HeaderContentWrap>
                <motion.div
                  initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
                >
                  <PageTitle>
                    <Heading level={1}>{title || 'Articles'}</Heading>
                  </PageTitle>
                </motion.div>
                <ArticlesSkipLink
                  href="#articles"
                  element="a"
                  onClick={skipToArticles}
                >
                  Skip to articles
                </ArticlesSkipLink>
              </HeaderContentWrap>
            </Padded>
          </ContentWrap>
        </Header>
        <ArticlesWrap
          id="articles"
          aria-labelledby="articles-label"
          tabIndex="-1"
          ref={articlesRef}
        >
          <Spaced bottom="5x">
            <ContentWrap>
              <ScreenReaderText>
                <Heading level={2} id="articles-label">
                  Articles
                </Heading>
              </ScreenReaderText>
              <Articles />
            </ContentWrap>
          </Spaced>
        </ArticlesWrap>
      </BlogIndexWrap>
    </>
  )
}

BlogIndexPageTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      fieldValue: PropTypes.string.isRequired,
      totalCount: PropTypes.number.isRequired
    })
  ).isRequired
}

const BlogIndexPage = ({
  location,
  data: {
    mdx: post,
    allMdx: { group: tags }
  }
}) => {
  const { title } = post.frontmatter

  return <BlogIndexPageTemplate location={location} title={title} tags={tags} />
}

BlogIndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired
        })
      ).isRequired
    })
  }).isRequired
}

export default BlogIndexPage

export const blogPageQuery = graphql`
  query BlogPage {
    mdx(frontmatter: { templateKey: { eq: "blog-page" } }) {
      frontmatter {
        title
      }
    }
    allMdx(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

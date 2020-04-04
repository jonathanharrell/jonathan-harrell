import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import Heading from '../../jh-ui/Heading'
import Padded from '../../jh-ui/Padded'
import Tag from '../../jh-ui/Tag'
import Spaced from '../../jh-ui/Spaced'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Layout from '../../components/Layout'
import ContentWrap from '../../components/ContentWrap'
import Articles from '../../components/Articles'
import Seo from '../../components/seo'
import website from '../../../website-config'
import { ArticlesWrap, BlogIndexWrap, Header, Link, TagWrap } from './styles'
import { motion } from 'framer-motion'

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
              <div>
                <motion.div
                  initial={
                    typeof window !== 'undefined'
                      ? { opacity: 0, y: 50 }
                      : false
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
                >
                  <Heading level={1}>{title || 'Articles'}</Heading>
                </motion.div>
                <motion.div
                  initial={
                    typeof window !== 'undefined'
                      ? { opacity: 0, y: 50 }
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
                  <Spaced top="xxl">
                    <ScreenReaderText>
                      <Heading level={2} id="tags-label">
                        Tags
                      </Heading>
                    </ScreenReaderText>
                    <ScreenReaderText>
                      <a href="#articles" onClick={skipToArticles}>
                        Skip to articles
                      </a>
                    </ScreenReaderText>
                    {tags && (
                      <section aria-labelledby="tags-label">
                        <ul>
                          {tags.map(tag => (
                            <TagWrap key={tag.fieldValue + `tag`}>
                              <Tag
                                as={Link}
                                to={`/tags/${kebabCase(tag.fieldValue)}/`}
                                aria-label={`View articles with the tag ${tag.fieldValue}`}
                              >
                                {tag.fieldValue}
                              </Tag>
                            </TagWrap>
                          ))}
                        </ul>
                      </section>
                    )}
                  </Spaced>
                </motion.div>
              </div>
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

  return (
    <Layout>
      <BlogIndexPageTemplate location={location} title={title} tags={tags} />
    </Layout>
  )
}

BlogIndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  mount: PropTypes.bool.isRequired,
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

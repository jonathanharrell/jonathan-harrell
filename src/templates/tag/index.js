import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Spaced from '../../jh-ui/Spaced'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Link from '../../jh-ui/Link'
import Layout from '../../components/Layout'
import ContentWrap from '../../components/ContentWrap'
import Seo from '../../components/seo'
import website from '../../../website-config'
import { ArticlesWrap, BlogExcerpt, Header, Links, TagIndexWrap } from './styles'

const TagRoute = ({ location, data: { allMdx: { edges: posts } }, pageContext: { tag } }) => {
  const tagHeading = `${posts.length} post${
    posts.length === 1 ? '' : 's'
  } tagged with “${tag}”`

  return (
    <Layout>
      <Seo
        title={`Posts tagged with “${tag}“ | ${website.titleAlt}`}
        pathname={location.pathname}
        description="Stay update to date on the latest developments in HTML, CSS and Javascript. Read Jonathan Harrell's blog for tips, tricks and techniques."
      />
      <TagIndexWrap>
        <Header>
          <ContentWrap>
            <Padded vertical="3x">
              <div>
                <Heading level={1}>
                  {tagHeading}
                </Heading>
                <Spaced top="m">
                  <Links>
                    <Spaced horizontal="m">
                      <Link to="/blog/" arrow={true} arrowPosition="left">
                        See all articles
                      </Link>
                      <Link to="/tags/" arrow={true} arrowPosition="right">
                        Browse all tags
                      </Link>
                    </Spaced>
                  </Links>
                </Spaced>
              </div>
            </Padded>
          </ContentWrap>
        </Header>
        <section
          id="articles"
          aria-labelledby="articles-label"
        >
          <Spaced bottom="5x">
            <ContentWrap>
              <ScreenReaderText>
                <Heading level={2} id="articles-label">
                  Articles
                </Heading>
              </ScreenReaderText>
              <ArticlesWrap>
                {posts && posts.map(({ node: post }, index) => (
                  <BlogExcerpt
                    key={post.id}
                    index={index}
                    link={post.fields.slug}
                    svg={post.frontmatter.featuredimage.fields.markup}
                    date={new Date(post.frontmatter.date)}
                    title={post.frontmatter.title}
                    excerpt={post.excerpt}
                  />
                ))}
              </ArticlesWrap>
            </ContentWrap>
          </Spaced>
        </section>
      </TagIndexWrap>
    </Layout>
  )
}

TagRoute.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string.isRequired,
          excerpt: PropTypes.string.isRequired,
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired
          }).isRequired,
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            featuredimage: PropTypes.shape({
              fields: PropTypes.shape({
                markup: PropTypes.string.isRequired
              })
            }).isRequired
          }).isRequired
        }).isRequired
      })).isRequired
    }).isRequired
  }).isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired
  }).isRequired
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 150)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date
            tags
            featuredimage {
              fields {
                markup
              }
            }
          }
        }
      }
    }
  }
`

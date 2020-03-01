import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Padded from '../jh-ui/Padded'
import ContentWrap from '../components/ContentWrap'
import Heading from '../jh-ui/Heading'
import Spaced from '../jh-ui/Spaced'
import ScreenReaderText from '../jh-ui/ScreenReaderText'
import ArticleExcerpt, { CardContent } from '../jh-ui/ArticleExcerpt'
import Link from '../jh-ui/Link'

const TagIndexWrap = styled.div`
  flex: 1;
  background-color: var(--backgroundPrimary);
`

const Header = styled.header`
  padding-top: ${({ theme }) => theme.spacing['3x']};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
  }
`

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ArticlesWrap = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
`

const BlogExcerpt = styled(ArticleExcerpt)`
  grid-column: 1 / -1;
  height: 100%;
  background-color: var(--backgroundElevatedSecondary);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 6;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: auto / span 4;
  }

  ${CardContent} {
    grid-template-rows: 15rem 1fr;
  }
`

const TagRoute = ({ data, pageContext }) => {
  const posts = data.allMdx.edges
  const tag = pageContext.tag
  const title = data.site.siteMetadata.title
  const totalCount = data.allMdx.totalCount
  const tagHeading = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with “${tag}”`

  return (
    <Layout>
      <Helmet title={`${tag} | ${title}`}/>
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
                    tags={post.frontmatter.tags}
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
      totalCount
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

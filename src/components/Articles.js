import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'
import ArticleExcerpt from '../jh-ui/ArticleExcerpt'

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
`

class Articles extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMdx

    return (
      <ArticlesWrap>
        {posts && posts.map(({ node: post }, index) => (
          <BlogExcerpt
            key={post.id}
            index={index}
            link={post.fields.slug}
            image={post.frontmatter.featuredimage}
            date={new Date(post.frontmatter.date)}
            title={post.frontmatter.title}
            excerpt={post.excerpt}
            tags={post.frontmatter.tags}
          />
        ))}
      </ArticlesWrap>
    )
  }
}

Articles.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query ArticlesQuery {
        allMdx(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
                    light {
                      publicURL
                    }
                    dark {
                      publicURL
                    }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Articles data={data} count={count}/>}
  />
)

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'
import ArticleExcerpt from '../jh-ui/ArticleExcerpt'

const RecentArticlesWrap = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl} 0;
  grid-template-columns: repeat(12, 1fr);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-gap: ${({ theme }) => theme.spacing.xxl};
  }

  > *:nth-child(4) {
    display: none;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: block;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      display: none;
    }
  }
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

class RecentArticles extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMdx

    return (
      <RecentArticlesWrap>
        {posts &&
        posts.map(({ node: post }) => (
          <BlogExcerpt
            key={post.id}
            link={post.fields.slug}
            date={new Date(post.frontmatter.date)}
            title={post.frontmatter.title}
            excerpt={post.excerpt}
            tags={post.frontmatter.tags}
          />
        ))}
      </RecentArticlesWrap>
    )
  }
}

RecentArticles.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query RecentArticlesQuery {
        allMdx(
          limit: 4
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
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <RecentArticles data={data} count={count}/>}
  />
)

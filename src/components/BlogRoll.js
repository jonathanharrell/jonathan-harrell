import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'
import ArticleExcerpt from '../jh-ui/ArticleExcerpt'
import { breakpoints } from '../jh-ui/themes'

const BlogRollWrap = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
  
  > *:nth-child(4) {
    display: none;
    
    @media (min-width: ${breakpoints.tablet}) {
      display: block;
    }
    
    @media (min-width: ${breakpoints.desktop}) {
      display: none;
    }
  }
`

const BlogExcerpt = styled(ArticleExcerpt)`
  grid-column: 1 / -1;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundElevatedSecondary};
  
  @media (min-width: ${breakpoints.tablet}) {
    grid-column: auto / span 6;
  }
  
  @media (min-width: ${breakpoints.desktop}) {
    grid-column: auto / span 4;
  }
`

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <BlogRollWrap>
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
      </BlogRollWrap>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
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
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                tags
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count}/>}
  />
)

import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { ArticlesWrap, BlogExcerpt } from './styles'

const Articles = ({ data: { allMdx: { edges: posts } } }) => (
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
)

Articles.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
      ).isRequired
    }).isRequired
  }).isRequired
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
    `}
    render={(data, count) => <Articles data={data} count={count}/>}
  />
)

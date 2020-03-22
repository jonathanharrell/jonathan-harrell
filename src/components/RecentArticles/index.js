import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { BlogExcerpt, RecentArticlesWrap } from './styles'

const RecentArticles = ({ data: { allMdx: { edges: posts } }, currentPostId }) => {
  if (currentPostId) posts = posts.filter(post => post.node.id !== currentPostId)
  posts = posts.slice(0, 4)

  return (
    <RecentArticlesWrap>
      {posts && posts.map(({ node: post }) => (
        <BlogExcerpt
          key={post.id}
          link={post.fields.slug}
          date={new Date(post.frontmatter.date)}
          title={post.frontmatter.title}
          excerpt={post.excerpt}
        />
      ))}
    </RecentArticlesWrap>
  )
}

RecentArticles.propTypes = {
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
            }).isRequired
          }).isRequired
        })
      ).isRequired
    }).isRequired
  }).isRequired
}

export default ({ currentPostId }) => (
  <StaticQuery
    query={graphql`
      query RecentArticlesQuery {
        allMdx(
          limit: 5
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
    render={(data) => <RecentArticles data={data} currentPostId={currentPostId}/>}
  />
)

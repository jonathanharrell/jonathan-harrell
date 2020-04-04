import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { ArticlesWrap, BlogExcerpt, BlogExcerptWrap } from './styles'

const variants = {
  mounted: {
    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
  }
}

const childVariants = {
  mounted: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      mass: 0.1
    }
  }
}

const Articles = ({
  data: {
    allMdx: { edges: posts }
  }
}) => (
  <ArticlesWrap animate="mounted" variants={variants}>
    {posts &&
      posts.map(({ node: post }, index) => (
        <BlogExcerptWrap
          key={post.id}
          variants={childVariants}
          initial={
            typeof window !== 'undefined' ? { opacity: 0, y: 50 } : false
          }
        >
          <BlogExcerpt
            index={index}
            link={post.fields.slug}
            svg={post.frontmatter.featuredimage.fields.markup}
            date={new Date(post.frontmatter.date)}
            title={post.frontmatter.title}
            excerpt={post.excerpt}
          />
        </BlogExcerptWrap>
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
    render={(data, count) => <Articles data={data} count={count} />}
  />
)

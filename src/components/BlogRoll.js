import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'
import ArticleExcerpt from '../jh-ui/ArticleExcerpt'

const BlogExcerpt = styled(ArticleExcerpt)`
  background-color: ${({ theme }) => theme.colors.backgroundElevatedSecondary};
`;

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div>
        {posts &&
          posts.map(({ node: post }) => (
            <div key={post.id}>
              <BlogExcerpt
                date={new Date(post.frontmatter.date)}
                title={post.frontmatter.title}
                excerpt={post.excerpt}
              />
              {/*<Card*/}
              {/*  element="article"*/}
              {/*  className={`blog-list-item tile is-child box notification ${*/}
              {/*    post.frontmatter.featuredpost ? 'is-featured' : ''*/}
              {/*  }`}*/}
              {/*>*/}
              {/*  <header>*/}
              {/*    {post.frontmatter.featuredimage ? (*/}
              {/*      <div className="featured-thumbnail">*/}
              {/*        <PreviewCompatibleImage*/}
              {/*          imageInfo={{*/}
              {/*            image: post.frontmatter.featuredimage,*/}
              {/*            alt: `featured image thumbnail for post ${post.title}`,*/}
              {/*          }}*/}
              {/*        />*/}
              {/*      </div>*/}
              {/*    ) : null}*/}
              {/*  </header>*/}
              {/*</Card>*/}
            </div>
          ))}
      </div>
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
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
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
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)

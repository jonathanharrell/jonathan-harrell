import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import kebabCase from 'lodash/kebabCase'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import ContentWrap from '../components/ContentWrap'
import Heading from '../jh-ui/Heading'
import Spaced from '../jh-ui/Spaced'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Padded from '../jh-ui/Padded'
import Text from '../jh-ui/Text'
import Link from '../jh-ui/Link'

const ArticleWrap = styled.article`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`

export const BlogPostTemplate = ({
                                   content,
                                   contentComponent,
                                   description,
                                   tags,
                                   title,
                                   helmet
                                 }) => {

  return (
    <ArticleWrap>
      {helmet || ''}
      <Padded vertical="3x">
        <ContentWrap>
          {tags && (
            <Spaced bottom="m">
              <div>
                {tags.map((tag, index) => (
                  <>
                    <Link key={tag + `tag`} to={`/tags/${kebabCase(tag)}/`}>
                      <Text order="meta">
                        {tag}
                      </Text>
                    </Link>
                    {index < tags.length - 1 && (
                      <Text order="meta" element="span"> • </Text>
                    )}
                  </>
                ))}
              </div>
            </Spaced>
          )}
          <Spaced bottom="m">
            <Heading level={1}>
              {title}
            </Heading>
          </Spaced>
          <MDXRenderer>
            {content}
          </MDXRenderer>
        </ContentWrap>
      </Padded>
    </ArticleWrap>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { mdx: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.body}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
    query BlogPostByID($id: String!) {
        mdx(id: { eq: $id }) {
            id
            body
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
                tags
            }
        }
    }
`

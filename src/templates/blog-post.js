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
import { breakpoints } from '../jh-ui/themes'

const ArticleWrap = styled.article`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  
  .gatsby-highlight pre {
    margin: ${({ theme }) => theme.spacing.xs} -${({ theme }) => theme.spacing.l} ${({ theme }) => theme.spacing.xl};
    padding: ${({ theme }) => theme.spacing.xl};
    
    @media (min-width: ${breakpoints.mobile}) {
      margin-right: -${({ theme }) => theme.spacing.xxl};
      margin-left: -${({ theme }) => theme.spacing.xxl};
    }
    
    @media (min-width: ${breakpoints.tablet}) {
      margin-right: 0;
      margin-left: 0;
      border-radius: 4px;
    }
  }
`

const ArticleContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  
  > * {
    grid-column: 1 / -1;
  
    @media (min-width: ${breakpoints.tablet}) {
      grid-column: 2 / -2;
    }
    
    @media (min-width: ${breakpoints.desktop}) {
      grid-column: 3 / -3;
    }
    
    @media (min-width: ${breakpoints.desktopLarge}) {
      grid-column: 4 / -4;
    }
  }
  
  .gatsby-highlight {
    @media (min-width: ${breakpoints.desktop}) {
      grid-column: 2 / -2;
      
      pre {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        padding: ${({ theme }) => theme.spacing.xl} 0;
        
        code {
          grid-column: 2 / -2;
        }
      }
    }
    
    @media (min-width: ${breakpoints.desktopLarge}) {
      grid-column: 3 / -3;
      
      pre {
        grid-template-columns: repeat(8, 1fr);
      }
    }
  }
`

const Tags = styled.div`
  max-width: 20rem;
  
  @media (min-width: ${breakpoints.mobile}) {
    max-width: unset;
  }
`

export const BlogPostTemplate = ({
                                   content,
                                   contentComponent,
                                   description,
                                   tags,
                                   title,
                                   date,
                                   helmet
                                 }) => {

  return (
    <ArticleWrap>
      {helmet || ''}
      <Padded vertical="3x">
        <ContentWrap>
          <ArticleContentWrap>
            {tags && (
              <Spaced bottom="xs">
                <Tags>
                  {tags.map((tag, index) => (
                    <span key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>
                    <Text order="meta">
                      {tag}
                    </Text>
                  </Link>
                      {index < tags.length - 1 && (
                        <Text order="meta" element="span"> • </Text>
                      )}
                </span>
                  ))}
                </Tags>
              </Spaced>
            )}
            <Spaced bottom="l">
              <Text order="body" color="textLighter" element="p">
                {date}
              </Text>
            </Spaced>
            <Spaced bottom="m">
              <Heading level={1}>
                {title}
              </Heading>
            </Spaced>
            <MDXRenderer>
              {content}
            </MDXRenderer>
          </ArticleContentWrap>
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
        date={post.frontmatter.date}
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

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
  background-color: var(--backgroundPrimary);
`

const ArticleContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`

const ArticleContent = styled.div`
  grid-column: 1 / -1;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 2 / -2;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 3 / -3;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    grid-column: 4 / -4;
  }
  
  .gatsby-highlight {
    margin: ${({ theme }) => theme.spacing.l} -${({ theme }) => theme.spacing.l} ${({ theme }) => theme.spacing.xxl};

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      margin-right: -${({ theme }) => theme.spacing.xl};
      margin-left: -${({ theme }) => theme.spacing.xl};
    }
    
    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
      margin-right: -${({ theme }) => theme.spacing.xxl};
      margin-left: -${({ theme }) => theme.spacing.xxl};
    }
    
    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      margin: ${({ theme }) => theme.spacing.xxl} 0;
    }
    
     @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
        margin: ${({ theme }) => theme.spacing['2x']} 0;
     }
    
    pre {
      padding: ${({ theme }) => theme.spacing.xl};

      @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        border-radius: 6px;
      }
    }
  }
  
  .anchor {
    display: none;
    position: absolute;
    font-size: 1em;
    line-height: 1.3;
    color: var(--accent);
    transform: translateX(calc(-100% - 0.25rem));
    
    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: block;
    }
  }
`

const FeaturedImage = styled.img`
  max-width: 100%;
  height: auto;
`

const ArticleMeta = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: baseline;
  }
`

const Tags = styled.div`
  max-width: 20rem;
  margin-bottom: 0.25rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: unset;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0 ${({ theme }) => theme.spacing.xxl} 0 0;
  }
`

export const BlogPostTemplate = ({
                                   content,
                                   tags,
                                   title,
                                   date,
                                   image,
                                   helmet
                                 }) => {

  return (
    <ArticleWrap>
      {helmet || ''}
      <Padded top="s" bottom="3x">
        <ContentWrap>
          <ArticleContentWrap>
            <ArticleContent>
              <header>
                {image && (
                  <Spaced bottom="2x">
                    <figure>
                      <FeaturedImage src={image.publicURL} alt=""/>
                    </figure>
                  </Spaced>
                )}
                <Spaced bottom="s">
                  <ArticleMeta>
                    {tags && (
                      <Tags>
                        {tags.map((tag, index) => (
                          <span key={tag + `tag`}>
                            <Link to={`/tags/${kebabCase(tag)}/`} aria-label={`View articles with the tag ${tag}`}>
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
                    )}
                    <Text order="body" color="textLighter" element="p">
                      {date}
                    </Text>
                  </ArticleMeta>
                </Spaced>
                <Spaced bottom="2x">
                  <Heading level={1}>
                    {title}
                  </Heading>
                </Spaced>
              </header>
              <MDXRenderer>
                {content}
              </MDXRenderer>
            </ArticleContent>
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
        image={post.frontmatter.featuredimage}
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
                featuredimage {
                    publicURL
                }
            }
        }
    }
`

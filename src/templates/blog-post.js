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
import ScreenReaderText from '../jh-ui/ScreenReaderText'

const ArticleWrap = styled.article`
  background-color: var(--backgroundPrimary);
`

const ArticleContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`

const Figure = styled.figure`
  grid-column: 1 / -1;
`

const FeaturedImage = styled.img`
  width: 100%;
  height: auto;
`

const ArticleContent = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 2 / -2;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 3 / -3;
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

const ArticleMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
`

const Tags = styled.ul`
  margin: 0 ${({ theme }) => theme.spacing.xxl} 0 0;
`

const Tag = styled.li`
  display: inline-block;
  list-style: none;
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
    <ArticleWrap aria-labelledby="article-title">
      {helmet || ''}
      <Padded top="s" bottom="4x">
        <ContentWrap>
          <ArticleContentWrap>
            {image && (
              <Spaced bottom="3x">
                <Figure>
                  <FeaturedImage src={image.publicURL} alt=""/>
                </Figure>
              </Spaced>
            )}
            <ArticleContent>
              <header>
                <Spaced bottom="s">
                  <ArticleMeta>
                    {tags && (
                      <div>
                        <ScreenReaderText>
                          <Heading
                            level={2}
                            id="article-tags-label"
                          >
                            Article Tags
                          </Heading>
                        </ScreenReaderText>
                        <Tags aria-labelledby="article-tags-label">
                          {tags.map((tag, index) => (
                            <Tag key={tag + `tag`}>
                              <Link to={`/tags/${kebabCase(tag)}/`} aria-label={`View articles with the tag ${tag}`}>
                                <Text order="meta">
                                  {tag}
                                </Text>
                              </Link>
                              {index < tags.length - 1 && (
                                <Text order="meta" element="span" aria-hidden>&nbsp;•&nbsp;</Text>
                              )}
                            </Tag>
                          ))}
                        </Tags>
                      </div>
                    )}
                    <Text order="meta" color="textLighter" element="span">
                      <ScreenReaderText>Article published date&nbsp;</ScreenReaderText>
                      {date}
                    </Text>
                  </ArticleMeta>
                </Spaced>
                <Spaced bottom="2x">
                  <Heading level={1} id="article-title">
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

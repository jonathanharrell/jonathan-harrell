import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import BodyClassName from 'react-body-classname'
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
import ThemeContext from '../context/theme'

const getArticleHeaderBackground = color => {
  switch (color) {
    case 'blue':
      return 'var(--gradientBlue)'
    case 'orange':
      return 'var(--gradientOrange)'
    case 'gray':
    default:
      return 'var(--gradientGray)'
  }
}

const ArticleWrap = styled.article`
  background-color: var(--backgroundPrimary);
`

const ArticleHeader = styled.header`
  background: ${({ color }) => getArticleHeaderBackground(color)};
  clip-path: url(#wave);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 32.5rem;
  }

  ${ContentWrap} {
    height: 100%;
  }
`

const ArticleHeaderContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  position: relative;
  height: 100%;
  padding: 8rem 0 6rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: 10rem;
  }
`

const ArticleContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`

const Figure = styled.figure`
  display: none;
  grid-column: 1 / -1;
  position: absolute;
  top: 0;
  right: -25%;
  height: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    right: 0;
  }
`

const FeaturedImage = styled.img`
  width: 100%;
`

const ArticleHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  grid-column: 1 / -1;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: auto / span 10;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 7;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: auto / span 6;
  }
`

const TagLink = styled(Link)`
  span {
    transition: opacity 0.2s ${({ theme }) => theme.beziers.out};
  }

  &:hover,
  &:focus,
  &:active {
    span {
      color: var(--textLight);

      .header-background-orange & {
        color: ${({ theme }) => theme.colors.white} !important;
        opacity: 0.5;
      }
    }
  }
`

const getArticleTitleColor = color => {
  switch (color) {
    case 'blue':
      return 'white'
    case 'orange':
      return 'white'
    case 'gray':
    default:
      return 'var(--text)'
  }
}

const ArticleTitle = styled(Heading)`
  color: ${({ color }) => getArticleTitleColor(color)};
`

const getArticleHeaderTextColor = color => {
  switch (color) {
    case 'orange':
      return 'white'
    case 'blue':
    case 'gray':
    default:
      return 'var(--textLighter)'
  }
}

const ArticleHeaderText = styled(Text)`
  color: ${({ color }) => getArticleHeaderTextColor(color)};
`

const Mask = styled.svg`
  clip: rect(0 0 0 0);
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  margin: -1px;
  padding: 0;
  border: 0;
  white-space: nowrap;
`

const ArticleContent = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 2 / -2;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 3 / -3;
  }

  p:first-child:first-letter {
    float: left;
    margin-right: 0.75rem;
    font-family: ${({ theme }) => theme.fonts.serifDisplay};
    font-size: 6rem;
    line-height: 0.85;
  }

  .gatsby-highlight {
    margin: ${({ theme }) => theme.spacing['2x']} -${({ theme }) => theme.spacing.l} ${({ theme }) => theme.spacing['2x']};

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

  > * {
    position: relative;
    z-index: 1;
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
  description,
  date,
  color,
  image,
  helmet
}) => {
  const { themeName } = useContext(ThemeContext)

  return (
    <ArticleWrap aria-labelledby="article-title">
      {helmet || ''}
      <BodyClassName className={`header-background-${color}`}/>
      <ArticleHeader color={color}>
        <ContentWrap>
          <ArticleHeaderContentWrap>
            {(image && image[themeName]) && (
              <Spaced bottom="3x">
                <Figure>
                  <FeaturedImage src={image[themeName].publicURL} alt="" width="1200" height="600"/>
                </Figure>
              </Spaced>
            )}
            <ArticleHeaderContent>
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
                            <TagLink
                              to={`/tags/${kebabCase(tag)}/`}
                              aria-label={`View articles with the tag ${tag}`}
                            >
                              <ArticleHeaderText color={color} order="meta" element="span">
                                {tag}
                              </ArticleHeaderText>
                            </TagLink>
                            {index < tags.length - 1 && (
                              <ArticleHeaderText color={color} order="meta" element="span" aria-hidden>
                                &nbsp;•&nbsp;
                              </ArticleHeaderText>
                            )}
                          </Tag>
                        ))}
                      </Tags>
                    </div>
                  )}
                  <ArticleHeaderText color={color} order="meta" element="span">
                    <ScreenReaderText>Article published date&nbsp;</ScreenReaderText>
                    {date}
                  </ArticleHeaderText>
                </ArticleMeta>
              </Spaced>
              <Spaced bottom="m">
                <ArticleTitle level={1} color={color} id="article-title">
                  {title}
                </ArticleTitle>
              </Spaced>
              {description && (
                <ArticleHeaderText color={color} order="body" element="p">
                  {description}
                </ArticleHeaderText>
              )}
            </ArticleHeaderContent>
          </ArticleHeaderContentWrap>
        </ContentWrap>
      </ArticleHeader>
      <Mask>
        <clipPath id="wave" clipPathUnits="objectBoundingBox">
          <path
            d="M1,0.843688301 C0.84002688,0.986453208 0.673360164,1.031424 0.5,0.978600682 C0.328125233,0.926230056 0.162829975,0.927702402 0.00411407769,0.983017719 L0,0.984465905 L0,0 L1,0 L1,0.843688301 Z"/>
        </clipPath>
      </Mask>
      <Padded vertical="4x">
        <ContentWrap>
          <ArticleContentWrap>
            <ArticleContent>
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
        description={post.frontmatter.description}
        date={post.frontmatter.date}
        color={post.frontmatter.headercolor}
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
        headercolor
        featuredimage {
          light {
            publicURL
          }
          dark {
            publicURL
          }
        }
      }
    }
  }
`

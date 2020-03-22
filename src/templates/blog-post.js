import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import styled from 'styled-components'
import BodyClassName from 'react-body-classname'
import kebabCase from 'lodash/kebabCase'
import { graphql } from 'gatsby'
import { motion, useViewportScroll } from 'framer-motion'
import TypeMate from 'typemate'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import ContentWrap from '../components/ContentWrap'
import RecentArticles from '../components/RecentArticles'
import Heading from '../jh-ui/Heading'
import Spaced from '../jh-ui/Spaced'
import Padded from '../jh-ui/Padded'
import Text from '../jh-ui/Text'
import Link from '../jh-ui/Link'
import ScreenReaderText from '../jh-ui/ScreenReaderText'
import Button from '../jh-ui/Button'
import Share from '../img/icons/share.svg'
import Twitter from '../img/icons/twitter.svg'
import Github from '../img/icons/github.svg'
import website from '../../website-config'
import Seo from '../components/seo'

const ProgressBarWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 4;
`

const ArticleWrap = styled.article`
  background-color: var(--backgroundPrimary);
`

const ArticleHeader = styled.header`
  position: relative;
  overflow: hidden;
  background-color: var(--backgroundSecondary);
  clip-path: url(#wave);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 32.5rem;
  }

  &::after {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradientGray);
    mix-blend-mode: multiply;
    content: "";
  }

  ${ContentWrap} {
    position: relative;
    z-index: 1;
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

  > div {
    width: 100%;
    height: 100%;
  }

  svg {
    height: 100%;
  }
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
    }
  }
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

  > p:first-child:first-letter {
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

  svg,
  img {
    width: 100%;
    height: auto;
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

const Tag = styled.li`
  display: inline-block;
  list-style: none;
`

const ArticleLinksWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: baseline;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
  }
`

const ShareLink = styled(Link)`
  margin-bottom: ${({ theme }) => theme.spacing.m};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 0;
  }

  svg {
    width: 1em;
    height: 1em;
  }
`

const Divider = styled(Text)`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: inline;
  }
`

const RecentArticlesWrap = styled.section`
  background-color: var(--backgroundSecondary);
`

export const BlogPostTemplate = ({
  id,
  content,
  tags,
  title,
  description,
  date,
  color,
  image,
  readingTime,
  slug,
  location
}) => {
  const [hasNavigatorShare, setHasNavigatorShare] = useState(false)
  const { scrollYProgress } = useViewportScroll()
  const articleWrap = useRef()
  const articleContent = useRef()

  const githubUrl = `https://github.com/jonathanharrell/gatsby-starter-netlify-cms/edit/master/src/content${slug}`
  const re = new RegExp(/.+?(?=\/$)/)
  const [match] = githubUrl.match(re)
  const processedGithubUrl = `${match}.mdx`

  const shareArticle = () => {
    try {
      navigator.share({
        title,
        url: `${window.location.origin}${slug}`
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setHasNavigatorShare(!!navigator.share)
  }, [])

  useLayoutEffect(() => {
    const typeMateInstance = new TypeMate(articleWrap.current, { selector: 'h1, h2, h3, h4, h5, h6, p' })
    typeMateInstance.apply()
  }, [])

  return (
    <>
      <Seo
        title={`${title} | ${website.titleAlt}`}
        pathname={location.pathname}
        description={description}
        article
      />
      <ArticleWrap ref={articleWrap} aria-labelledby="article-title">
        <BodyClassName className={`header-background-gray`}/>
        <ProgressBarWrap>
          <motion.div
            style={{
              width: '100%',
              height: '0.2rem',
              background: 'var(--accent)',
              scaleX: scrollYProgress,
              transformOrigin: '0 0'
            }}
          />
        </ProgressBarWrap>
        <ArticleHeader color={color}>
          <ContentWrap>
            <ArticleHeaderContentWrap>
              {image && (
                <Spaced bottom="3x">
                  <Figure dangerouslySetInnerHTML={{ __html: image.fields.markup }}/>
                </Spaced>
              )}
              <ArticleHeaderContent>
                <Spaced bottom="s">
                  <ArticleMeta>
                    {tags && (
                      <Spaced right="xxl">
                        <div>
                          <ScreenReaderText>
                            <Heading
                              level={2}
                              id="article-tags-label"
                            >
                              Article Tags
                            </Heading>
                          </ScreenReaderText>
                          <ul aria-labelledby="article-tags-label">
                            {tags.map((tag, index) => (
                              <Tag key={tag + `tag`}>
                                <TagLink
                                  to={`/tags/${kebabCase(tag)}/`}
                                  aria-label={`View articles with the tag ${tag}`}
                                >
                                  <Text order="meta" element="span">
                                    {tag}
                                  </Text>
                                </TagLink>
                                {index < tags.length - 1 && (
                                  <Text order="meta" element="span" aria-hidden>
                                    &nbsp;•&nbsp;
                                  </Text>
                                )}
                              </Tag>
                            ))}
                          </ul>
                        </div>
                      </Spaced>
                    )}
                    <Spaced right="xxl">
                      <Text order="meta" element="span">
                        <ScreenReaderText>Article published date&nbsp;</ScreenReaderText>
                        {date}
                      </Text>
                    </Spaced>
                    <Text order="meta" element="span">
                      {readingTime.text}
                    </Text>
                  </ArticleMeta>
                </Spaced>
                <Spaced bottom="m">
                  <Heading level={1} id="article-title">
                    {title}
                  </Heading>
                </Spaced>
                {description && (
                  <Text order="body" color="textLighter" element="p">
                    {description}
                  </Text>
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
              <ArticleContent ref={articleContent}>
                <MDXRenderer>
                  {content}
                </MDXRenderer>
                <Spaced top="4x">
                  <ArticleLinksWrap>
                    {hasNavigatorShare && (
                      <span>
                        <Button unstyled={true} onClick={shareArticle}>
                          <ShareLink element="span">
                            <Spaced right="xs">
                              <Share/>
                            </Spaced>
                            Share this article
                          </ShareLink>
                        </Button>
                      </span>
                    )}
                    {(!hasNavigatorShare && location.href) && (
                      <span>
                        <ShareLink
                          href={`https://twitter.com/intent/tweet?text=${title}&url=${location.href}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Spaced right="xs">
                            <Twitter/>
                          </Spaced>
                          Discuss on Twitter
                        </ShareLink>
                      </span>
                    )}
                    {((hasNavigatorShare || location.href) && processedGithubUrl) && (
                      <Spaced horizontal="s">
                        <Divider element="span">•</Divider>
                      </Spaced>
                    )}
                    {processedGithubUrl && (
                      <ShareLink
                        href={processedGithubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Spaced right="xs">
                          <Github/>
                        </Spaced>
                        Edit on Github
                      </ShareLink>
                    )}
                  </ArticleLinksWrap>
                </Spaced>
              </ArticleContent>
            </ArticleContentWrap>
          </ContentWrap>
        </Padded>
        <RecentArticlesWrap aria-labelledby="more-label">
          <Padded vertical="5x">
            <ContentWrap>
              <Spaced bottom="2x">
                <Heading level={2} id="more-label">
                  More Articles
                </Heading>
              </Spaced>
              <RecentArticles currentPostId={id}/>
            </ContentWrap>
          </Padded>
        </RecentArticlesWrap>
      </ArticleWrap>
    </>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data, location }) => {
  const { mdx: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        id={post.id}
        content={post.body}
        contentComponent={HTMLContent}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        date={post.frontmatter.date}
        image={post.frontmatter.featuredimage}
        readingTime={post.fields.readingTime}
        slug={post.fields.slug}
        location={location}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object
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
          fields {
            markup
          }
        }
      }
      fields {
        readingTime {
          text
        }
        slug
      }
    }
  }
`

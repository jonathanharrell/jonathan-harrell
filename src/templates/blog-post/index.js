import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import BodyClassName from 'react-body-classname'
import debounce from 'lodash/debounce'
import kebabCase from 'lodash/kebabCase'
import { AnimatePresence, motion, useViewportScroll } from 'framer-motion'
import { ArrowUp, GitHub, Share, Twitter } from 'react-feather'
import TypeMate from 'typemate'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import Heading from '../../jh-ui/Heading'
import Spaced from '../../jh-ui/Spaced'
import Padded from '../../jh-ui/Padded'
import Text from '../../jh-ui/Text'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Button from '../../jh-ui/Button'
import Seo from '../../components/seo'
import ContentWrap from '../../components/ContentWrap'
import PageTitle from '../../components/PageTitle'
import TableOfContents from '../../components/TableOfContents'
import RecentArticles from '../../components/RecentArticles'
import website from '../../../website-config'
import { shouldAnimate } from '../../helpers'
import {
  ArticleContent,
  ArticleContentWrap,
  ArticleHeader,
  ArticleHeaderContent,
  ArticleHeaderContentWrap,
  ArticleLinksWrap,
  ArticleMeta,
  ArticleWrap,
  Divider,
  Figure,
  Mask,
  ProgressBarWrap,
  RecentArticlesWrap,
  ScrollToTopLink,
  ShareLink,
  Tag,
  TagLink
} from './styles'

export const BlogPostTemplate = ({
  location,
  id,
  content,
  tags,
  title,
  description,
  date,
  image,
  socialImage,
  readingTime,
  slug,
  tableOfContents
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [hasNavigatorShare, setHasNavigatorShare] = useState(false)
  const { scrollYProgress } = useViewportScroll()
  const articleWrap = useRef()
  const articleContent = useRef()

  const githubUrl = `https://github.com/jonathanharrell/jonathan-harrell/edit/master/src/content${slug}`
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

  const handleScroll = debounce(() => {
    setScrolled(window.scrollY > 100)
  }, 50)

  const scrollToTop = event => {
    event.preventDefault()
    window.scrollTo(0, 0)
    const navSkipLink = document.getElementById('nav-skip-link')
    if (navSkipLink) navSkipLink.focus()
  }

  useEffect(() => {
    setHasNavigatorShare(!!navigator.share)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useLayoutEffect(() => {
    const typeMateInstance = new TypeMate(articleWrap.current, {
      selector: 'h1, h2, h3, h4, h5, h6, p'
    })
    typeMateInstance.apply()
  }, [])

  return (
    <>
      <Seo
        title={`${title} | ${website.titleAlt}`}
        pathname={location.pathname}
        description={description}
        banner={socialImage ? socialImage.publicURL : undefined}
        publicationDate={date}
        article
      />
      <ArticleWrap ref={articleWrap} aria-labelledby="article-title">
        <BodyClassName className={`header-background-gray`} />
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
        <ArticleHeader>
          <ContentWrap>
            <ArticleHeaderContentWrap>
              {image && (
                <Spaced bottom="3x">
                  <Figure
                    dangerouslySetInnerHTML={{ __html: image.fields.markup }}
                    initial={shouldAnimate() ? { opacity: 0, scale: 1 } : false}
                    animate={{ opacity: 1, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 50, mass: 0.2 }}
                  />
                </Spaced>
              )}
              <ArticleHeaderContent>
                <motion.div
                  initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
                >
                  <Spaced bottom="s">
                    <ArticleMeta>
                      {tags && (
                        <Spaced right="xxl">
                          <div>
                            <ScreenReaderText>
                              <Heading level={2} id="article-tags-label">
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
                                    <Text
                                      order="meta"
                                      element="span"
                                      aria-hidden
                                    >
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
                          <ScreenReaderText>
                            Article published date&nbsp;
                          </ScreenReaderText>
                          {date}
                        </Text>
                      </Spaced>
                      <Text order="meta" element="span">
                        {readingTime.text}
                      </Text>
                    </ArticleMeta>
                  </Spaced>
                </motion.div>
                <motion.div
                  initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 50,
                    mass: 0.1,
                    delay: 0.1
                  }}
                >
                  <Spaced bottom="m">
                    <PageTitle>
                      <Heading level={1} id="article-title">
                        {title}
                      </Heading>
                    </PageTitle>
                  </Spaced>
                </motion.div>
                {description && (
                  <motion.div
                    initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 50,
                      mass: 0.1,
                      delay: 0.2
                    }}
                  >
                    <Text order="body" color="textLighter" element="p">
                      {description}
                    </Text>
                  </motion.div>
                )}
                {tableOfContents.items.length && (
                  <motion.div
                    initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 50,
                      mass: 0.1,
                      delay: 0.3
                    }}
                  >
                    <Spaced top="l">
                      <div>
                        <TableOfContents items={tableOfContents.items} />
                      </div>
                    </Spaced>
                  </motion.div>
                )}
              </ArticleHeaderContent>
            </ArticleHeaderContentWrap>
          </ContentWrap>
        </ArticleHeader>
        <Mask>
          <clipPath id="wave" clipPathUnits="objectBoundingBox">
            <path d="M1,0.843688301 C0.84002688,0.986453208 0.673360164,1.031424 0.5,0.978600682 C0.328125233,0.926230056 0.162829975,0.927702402 0.00411407769,0.983017719 L0,0.984465905 L0,0 L1,0 L1,0.843688301 Z" />
          </clipPath>
        </Mask>
        <motion.div
          initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 50, mass: 0.1, delay: 0.3 }}
        >
          <Padded vertical="4x">
            <ContentWrap>
              <ArticleContentWrap>
                <ArticleContent ref={articleContent}>
                  <MDXRenderer>{content}</MDXRenderer>
                  <Spaced top="4x">
                    <ArticleLinksWrap>
                      {hasNavigatorShare && (
                        <span>
                          <Button unstyled={true} onClick={shareArticle}>
                            <ShareLink element="span">
                              <Spaced right="xs">
                                <Share />
                              </Spaced>
                              Share this article
                            </ShareLink>
                          </Button>
                        </span>
                      )}
                      {!hasNavigatorShare && location.href && (
                        <span>
                          <ShareLink
                            href={`https://twitter.com/intent/tweet?text=${title}&url=${location.href}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Spaced right="xs">
                              <Twitter />
                            </Spaced>
                            Discuss on Twitter
                          </ShareLink>
                        </span>
                      )}
                      {(hasNavigatorShare || location.href) &&
                        processedGithubUrl && (
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
                            <GitHub />
                          </Spaced>
                          Edit on Github
                        </ShareLink>
                      )}
                    </ArticleLinksWrap>
                    {scrolled && (
                      <AnimatePresence>
                        <motion.div
                          id="main-menu"
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 100 }}
                          transition={{
                            type: 'spring',
                            stiffness: 50,
                            mass: 0.2
                          }}
                          style={{
                            position: 'fixed',
                            bottom: '1rem',
                            right: '1rem'
                          }}
                        >
                          <ScrollToTopLink
                            href="#nav-skip-link"
                            element="a"
                            onClick={scrollToTop}
                          >
                            <ArrowUp />
                            <ScreenReaderText>Scroll to top</ScreenReaderText>
                          </ScrollToTopLink>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </Spaced>
                </ArticleContent>
              </ArticleContentWrap>
            </ContentWrap>
          </Padded>
        </motion.div>
        <motion.div
          initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 50, mass: 0.1, delay: 0.4 }}
        >
          <RecentArticlesWrap aria-labelledby="more-label">
            <Padded vertical="5x">
              <ContentWrap>
                <Spaced bottom="2x">
                  <Heading level={2} id="more-label">
                    More Articles
                  </Heading>
                </Spaced>
                <RecentArticles currentPostId={id} />
              </ContentWrap>
            </Padded>
          </RecentArticlesWrap>
        </motion.div>
      </ArticleWrap>
    </>
  )
}

BlogPostTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.shape({
    fields: PropTypes.shape({
      markup: PropTypes.string.isRequired
    })
  }).isRequired,
  socialImage: PropTypes.shape({
    publicURL: PropTypes.string.isRequired
  }).isRequired,
  readingTime: PropTypes.shape({
    text: PropTypes.string.isRequired
  }).isRequired,
  slug: PropTypes.string.isRequired,
  tableOfContents: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
}

const BlogPost = ({ location, data: { mdx: post } }) => (
  <BlogPostTemplate
    location={location}
    id={post.id}
    content={post.body}
    tags={post.frontmatter.tags}
    title={post.frontmatter.title}
    description={post.frontmatter.description}
    date={post.frontmatter.date}
    image={post.frontmatter.featuredimage}
    socialImage={post.frontmatter.socialimage}
    readingTime={post.fields.readingTime}
    slug={post.fields.slug}
    tableOfContents={post.tableOfContents}
  />
)

BlogPost.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.node.isRequired,
      frontmatter: PropTypes.shape({
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        featuredimage: PropTypes.shape({
          fields: PropTypes.shape({
            markup: PropTypes.string.isRequired
          })
        }).isRequired,
        socialimage: PropTypes.shape({
          publicURL: PropTypes.string.isRequired
        }).isRequired
      }).isRequired,
      fields: PropTypes.shape({
        readingTime: PropTypes.shape({
          text: PropTypes.string.isRequired
        }).isRequired,
        slug: PropTypes.string.isRequired
      }).isRequired,
      tableOfContents: PropTypes.shape({
        items: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
          })
        ).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        title
        description
        tags
        featuredimage {
          publicURL
          fields {
            markup
          }
        }
        socialimage {
          publicURL
        }
      }
      fields {
        readingTime {
          text
        }
        slug
      }
      tableOfContents
    }
  }
`

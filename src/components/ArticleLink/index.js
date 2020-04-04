import React from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import Spaced from '../../jh-ui/Spaced'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import { ArticleLinkFigure, ArticleLinkLink, ArticleLinkWrap } from './styles'

const ArticleLink = ({ title }) => {
  // we need to grab all articles and then filter by the title prop
  const {
    allMdx: { edges }
  } = useStaticQuery(graphql`
    query ArticleLinksQuery {
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
  `)

  const [{ node: article }] = edges.filter(
    edge => edge.node.frontmatter.title === title
  )
  const svg = article.frontmatter.featuredimage.fields.markup

  return article ? (
    <Spaced vertical="xl">
      <ArticleLinkWrap
        padding={false}
        aria-labelledby={`${kebabCase(title)}-label`}
        element="article"
      >
        <ArticleLinkLink href={article.fields.slug}>
          <ScreenReaderText>Go to article</ScreenReaderText>
        </ArticleLinkLink>
        <ArticleLinkFigure
          dangerouslySetInnerHTML={{ __html: svg || undefined }}
        />
        <Padded vertical="2x" horizontal="xl">
          <div>
            <Heading level={5} id={`${kebabCase(title)}-label`} element="h2">
              {article.frontmatter.title}
            </Heading>
            <Spaced top="xs">
              <Text element="p" color="textLighter">
                {article.excerpt}
              </Text>
            </Spaced>
          </div>
        </Padded>
      </ArticleLinkWrap>
    </Spaced>
  ) : null
}

ArticleLink.propTypes = {
  title: PropTypes.string.isRequired
}

export default ArticleLink

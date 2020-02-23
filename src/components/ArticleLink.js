import React from 'react'
import styled from 'styled-components'
import Card from '../jh-ui/Card'
import Spaced from '../jh-ui/Spaced'
import { graphql, useStaticQuery } from 'gatsby'
import Padded from '../jh-ui/Padded'
import Heading from '../jh-ui/Heading'
import Text from '../jh-ui/Text'
import ScreenReaderText from '../jh-ui/ScreenReaderText'
import kebabCase from 'lodash/kebabCase'

const ArticleLinkWrap = styled(Card)`
  position: relative;
  background-color: var(--backgroundCode);
  border-radius: 6px;

  > div {
    display: flex;
    align-items: stretch;
  }
`

const ArticleLinkLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:focus {
    box-shadow: none;
  }
`

const ArticleLinkFigure = styled.figure`
  position: relative;
  flex: 0 0 10rem;
  background-color: var(--backgroundPrimary);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 0 8rem;
  }

  svg {
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 100% !important;
    transform: translateY(-50%);
  }
`

const ArticleLink = ({ title }) => {
  const { allMdx: { edges } } = useStaticQuery(graphql`
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

  const [{ node: article }] = edges.filter(edge => edge.node.frontmatter.title === title)
  const svg = article.frontmatter.featuredimage.fields.markup

  return article ? (
    <Spaced vertical="xl">
      <ArticleLinkWrap
        padding={false}
        aria-labelledby={`${kebabCase(title)}-label`}
        element="article"
      >
        <ArticleLinkLink href={article.fields.slug}>
          <ScreenReaderText>
            Go to article
          </ScreenReaderText>
        </ArticleLinkLink>
        <ArticleLinkFigure dangerouslySetInnerHTML={{ __html: svg || undefined }}/>
        <Padded vertical="2x" horizontal="xl">
          <div>
            <Heading
              level={5}
              id={`${kebabCase(title)}-label`}
              element="h2"
            >
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

export default ArticleLink

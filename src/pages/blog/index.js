import React, { useRef } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import ContentWrap from '../../components/ContentWrap'
import Articles from '../../components/Articles'
import Heading from '../../jh-ui/Heading'
import Padded from '../../jh-ui/Padded'
import { graphql } from 'gatsby'
import Link from '../../jh-ui/Link'
import kebabCase from 'lodash/kebabCase'
import Tag from '../../jh-ui/Tag'
import Spaced from '../../jh-ui/Spaced'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'

const BlogIndexWrap = styled.div`
  flex: 1;
  background-color: var(--backgroundPrimary);
`

const Header = styled.header`
  text-align: center;
`

const ArticlesWrap = styled.section`

`

const TagWrap = styled.li`
  display: inline-block;
  margin: 0 0.25rem 0.75rem 0;
`

export default function BlogIndexPage({
                                        data: {
                                          allMdx: { group: tags },
                                        }
                                      }) {
  const articlesRef = useRef()

  const skipToArticles = () => {
    articlesRef.current.focus()
  }

  return (
    <Layout>
      <BlogIndexWrap>
        <Header>
          <ContentWrap>
            <Padded vertical="3x">
              <div>
                <Heading level={1}>
                  Articles
                </Heading>
                <Spaced top="xxl">
                  <ScreenReaderText>
                    <Heading level={2} id="tags-label">
                      Tags
                    </Heading>
                  </ScreenReaderText>
                  <ScreenReaderText>
                    <a href="#articles" onClick={skipToArticles}>Skip to articles</a>
                  </ScreenReaderText>
                  {tags && (
                    <section aria-labelledby="tags-label">
                      <ul>
                        {tags.map(tag => (
                          <TagWrap key={tag.fieldValue + `tag`}>
                            <Link
                              to={`/tags/${kebabCase(tag.fieldValue)}/`}
                              aria-label={`View articles with the tag ${tag.fieldValue}`}
                            >
                              <Tag>
                                {tag.fieldValue}
                              </Tag>
                            </Link>
                          </TagWrap>
                        ))}
                      </ul>
                    </section>
                  )}
                </Spaced>
              </div>
            </Padded>
          </ContentWrap>
        </Header>
        <ArticlesWrap
          id="articles"
          aria-labelledby="articles-label"
          tabIndex="-1"
          ref={articlesRef}
        >
          <Spaced bottom="5x">
            <ContentWrap>
              <ScreenReaderText>
                <Heading level={2} id="articles-label">
                  Articles
                </Heading>
              </ScreenReaderText>
              <Articles/>
            </ContentWrap>
          </Spaced>
        </ArticlesWrap>
      </BlogIndexWrap>
    </Layout>
  )
}

export const pageQuery = graphql`
    query BlogPageTemplate {
        allMdx(limit: 1000) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`

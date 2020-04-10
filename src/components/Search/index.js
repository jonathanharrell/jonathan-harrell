import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import get from 'lodash/get'
import algoliasearch from 'algoliasearch/lite'
import {
  connectHighlight,
  connectHits,
  connectSearchBox,
  InstantSearch
} from 'react-instantsearch-dom'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import Tag from '../../jh-ui/Tag'
import Spaced from '../../jh-ui/Spaced'
import Padded from '../../jh-ui/Padded'
import Overlay from '../Overlay'
import Input from '../../jh-ui/Input'
import kebabCase from 'lodash/kebabCase'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'

const SearchWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  width: 30rem;
  height: 100vh;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 2rem;
  background: var(--backgroundPrimary);
  box-shadow: ${({ theme }) => theme.elevations.high};
`

const SearchInput = styled(Input)`
  width: 100%;
`

const HitsList = styled.ul`
  list-style: none;
`

const Hit = styled.li`
  border-top: 1px solid var(--border);
`

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
`

const Link = styled(GatsbyLink)`
  color: var(--text);
  text-decoration-color: transparent;
  transition: text-decoration-color 0.2s ${({ theme }) => theme.beziers.out};

  &:hover,
  &:focus,
  &:active {
    text-decoration-color: var(--text);
  }
`

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APPLICATION_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

const SearchBox = ({ currentRefinement, refine }) => (
  <div>
    <label htmlFor="search" className="visually-hidden">
      Search for articles
    </label>
    <SearchInput
      type="search"
      id="search"
      value={currentRefinement}
      placeholder="Search articles"
      onChange={event => refine(event.currentTarget.value)}
    />
  </div>
)

const CustomSearchBox = connectSearchBox(SearchBox)

const Highlight = ({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit
  })

  return (
    <span aria-label={get(hit, attribute)}>
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <mark key={index} aria-hidden>
            {part.value}
          </mark>
        ) : (
          <span key={index} aria-hidden>
            {part.value}
          </span>
        )
      )}
    </span>
  )
}

const CustomHighlight = connectHighlight(Highlight)

const Hits = ({ hits }) => (
  <HitsList>
    {hits.map(hit => (
      <Hit key={hit.objectID}>
        <Padded vertical="xxl">
          <article
            aria-labelledby={`${kebabCase(hit.frontmatter.title)}-label`}
          >
            <Spaced bottom="xs">
              <ArticleMeta>
                <Spaced right="xxl">
                  <Text order="meta" element="span">
                    {new Date(hit.frontmatter.date).toLocaleDateString(
                      'en-US',
                      {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      }
                    )}
                  </Text>
                </Spaced>
                <Text order="meta" element="span">
                  {hit.fields.readingTime.text}
                </Text>
              </ArticleMeta>
            </Spaced>
            <Spaced bottom="s">
              <Heading
                level={3}
                id={`${kebabCase(hit.frontmatter.title)}-label`}
              >
                <Link to={hit.fields.slug}>
                  <CustomHighlight
                    attribute="frontmatter.title"
                    hit={hit}
                    tagName="mark"
                  />
                </Link>
              </Heading>
            </Spaced>
            <Text color="textLighter">
              <CustomHighlight
                attribute="frontmatter.description"
                hit={hit}
                tagName="mark"
              />
            </Text>
            {hit.frontmatter.tags && hit.frontmatter.tags.length ? (
              <Spaced top="m">
                <ScreenReaderText>
                  <Heading level={4} id={`${hit.objectID}-tags-label`}>
                    Article Tags
                  </Heading>
                </ScreenReaderText>
                <ul aria-labelledby="article-tags-label">
                  {hit.frontmatter.tags.map((tag, index) => (
                    <Spaced key={`${hit.objectID}-tag-${index}`} right="xs">
                      <Tag inert={true}>{tag}</Tag>
                    </Spaced>
                  ))}
                </ul>
              </Spaced>
            ) : null}
          </article>
        </Padded>
      </Hit>
    ))}
  </HitsList>
)

const CustomHits = connectHits(Hits)

const Search = () => {
  return (
    <Overlay>
      <SearchWrap>
        <InstantSearch searchClient={searchClient} indexName="jh_posts">
          <Spaced bottom="3x">
            <div>
              <CustomSearchBox />
            </div>
          </Spaced>
          <section aria-labelledby="search-results-label">
            <Spaced bottom="xl">
              <Heading level={4} element="h2" id="search-results-label">
                Search results
              </Heading>
            </Spaced>
            <CustomHits />
          </section>
        </InstantSearch>
      </SearchWrap>
    </Overlay>
  )
}

export default Search

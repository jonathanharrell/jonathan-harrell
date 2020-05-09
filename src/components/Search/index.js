import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import get from 'lodash/get'
import kebabCase from 'lodash/kebabCase'
import algoliasearch from 'algoliasearch/lite'
import {
  connectHighlight,
  connectHits,
  connectSearchBox,
  connectStateResults,
  InstantSearch
} from 'react-instantsearch-dom'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import Tag from '../../jh-ui/Tag'
import Spaced from '../../jh-ui/Spaced'
import Padded from '../../jh-ui/Padded'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Loader from '../Loader'
import { addAlert, shouldAnimate } from '../../helpers'
import {
  ArticleMeta,
  Hit,
  HitsList,
  Link,
  LoaderWrap,
  NoResults,
  SearchInput,
  StateResultsWrap
} from './styles'
import NotFound from '../../svgs/not-found.svg'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APPLICATION_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

const SearchBox = ({ currentRefinement, refine }) => {
  const searchRef = useRef()

  useEffect(() => {
    searchRef.current.focus()
  }, [])

  return (
    <div>
      <label htmlFor="search" className="visually-hidden">
        Search for articles
      </label>
      <SearchInput
        ref={searchRef}
        type="search"
        id="search"
        value={currentRefinement}
        placeholder="Search articles"
        onChange={event => refine(event.currentTarget.value)}
      />
    </div>
  )
}

const CustomSearchBox = connectSearchBox(SearchBox)

const StateResults = ({ searchResults, searchState, searching, children }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0

  useEffect(() => {
    if (searchResults && searchState.query) {
      addAlert(
        `${searchResults.nbHits} article${
          searchResults.nbHits === 1 ? '' : 's'
        } found for search query ${searchState.query}`
      )
    }
  }, [searchResults, searchState])

  return (
    <StateResultsWrap>
      {hasResults && children}
      {!hasResults && searchState.query && (
        <NoResults>
          <motion.div
            initial={shouldAnimate() ? { opacity: 0, scale: 0.75 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
          >
            <Spaced bottom="xxl">
              <NotFound />
            </Spaced>
          </motion.div>
          <motion.div
            initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
          >
            <Heading level={4} element="h2">
              No matching search results
            </Heading>
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
            <Spaced top="xs">
              <Text color="textLighter">Try another search term</Text>
            </Spaced>
          </motion.div>
        </NoResults>
      )}
      {!hasResults && !searchState.query && (
        <LoaderWrap>
          <Loader>Loading...</Loader>
        </LoaderWrap>
      )}
    </StateResultsWrap>
  )
}

const CustomStateResults = connectStateResults(StateResults)

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

const variants = {
  mounted: {
    transition: { staggerChildren: 0.05, delayChildren: 0 }
  }
}

const childVariants = {
  mounted: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      mass: 0.1
    }
  }
}

const Hits = ({ hits }) => (
  <HitsList animate="mounted" variants={variants}>
    {hits.map(hit => (
      <Hit
        key={hit.objectID}
        variants={childVariants}
        initial={shouldAnimate() ? { opacity: 0, x: 50 } : false}
      >
        <Padded top="xxl" bottom="xl">
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
                    <Spaced
                      key={`${hit.objectID}-tag-${index}`}
                      right="xs"
                      bottom="xs"
                    >
                      <Tag hoverable={false}>{tag}</Tag>
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

const Search = () => (
  <InstantSearch searchClient={searchClient} indexName="jh_posts">
    <Spaced bottom="2x">
      <div>
        <CustomSearchBox />
      </div>
    </Spaced>
    <CustomStateResults>
      <section aria-labelledby="search-results-label">
        <motion.div
          initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
        >
          <Spaced bottom="l">
            <Heading level={4} element="h2" id="search-results-label">
              Search results
            </Heading>
          </Spaced>
        </motion.div>
        <CustomHits />
      </section>
    </CustomStateResults>
  </InstantSearch>
)

export default Search

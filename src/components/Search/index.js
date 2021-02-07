import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import get from "lodash/get";
import kebabCase from "lodash/kebabCase";
import algoliasearch from "algoliasearch/lite";
import {
	connectHighlight,
	connectHits,
	connectSearchBox,
	connectStateResults,
	InstantSearch
} from "react-instantsearch-dom";
import Heading from "../Heading";
import Text from "../Text";
import Loader from "../Loader";
import { addAlert, shouldAnimate } from "../../helpers";
import {
	ArticleMeta,
	Hit,
	HitsList,
	Link,
	LoaderWrap,
	NoResults,
	SearchInput,
	StateResultsWrap
} from "./styles";
import NotFound from "../../svgs/not-found.svg";

const searchClient = algoliasearch(
	process.env.GATSBY_ALGOLIA_APPLICATION_ID,
	process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
);

const SearchBox = ({ currentRefinement, refine }) => {
	const searchRef = useRef();

	useEffect(() => {
		searchRef.current.focus();
	}, []);

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
	);
};

const CustomSearchBox = connectSearchBox(SearchBox);

const StateResults = ({ searchResults, searchState, searching, children }) => {
	const hasResults = searchResults && searchResults.nbHits !== 0;

	useEffect(() => {
		if (searchResults && searchState.query) {
			addAlert(
				`${searchResults.nbHits} article${
					searchResults.nbHits === 1 ? "" : "s"
				} found for search query ${searchState.query}`
			);
		}
	}, [searchResults, searchState]);

	return (
		<StateResultsWrap>
			{hasResults && children}
			{!hasResults && searchState.query && (
				<NoResults>
					<motion.div
						initial={shouldAnimate() ? { opacity: 0, scale: 0.75 } : false}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ type: "spring", stiffness: 50, mass: 0.1 }}
					>
						<NotFound />
					</motion.div>
					<motion.div
						initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
						animate={{ opacity: 1, y: 0 }}
						transition={{ type: "spring", stiffness: 50, mass: 0.1 }}
					>
						<Heading level={4} element="h2">
							No matching search results
						</Heading>
					</motion.div>
					<motion.div
						initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							type: "spring",
							stiffness: 50,
							mass: 0.1,
							delay: 0.1
						}}
					>
						<Text color="textLighter">Try another search term</Text>
					</motion.div>
				</NoResults>
			)}
			{!hasResults && !searchState.query && (
				<LoaderWrap>
					<Loader>
						<span className="sr-only">Loading...</span>
					</Loader>
				</LoaderWrap>
			)}
		</StateResultsWrap>
	);
};

const CustomStateResults = connectStateResults(StateResults);

const Highlight = ({ highlight, attribute, hit }) => {
	const parsedHit = highlight({
		highlightProperty: "_highlightResult",
		attribute,
		hit
	});

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
	);
};

const CustomHighlight = connectHighlight(Highlight);

const variants = {
	mounted: {
		transition: { staggerChildren: 0.05, delayChildren: 0 }
	}
};

const childVariants = {
	mounted: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 50,
			mass: 0.1
		}
	}
};

const Hits = ({ hits }) => (
	<HitsList animate="mounted" variants={variants}>
		{hits.map(hit => (
			<Hit
				key={hit.objectID}
				variants={childVariants}
				initial={shouldAnimate() ? { opacity: 0, x: 50 } : false}
			>
				<article aria-labelledby={`${kebabCase(hit.frontmatter.title)}-label`}>
					<ArticleMeta>
						<Text order="meta" element="span">
							{new Date(hit.frontmatter.date).toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric"
							})}
						</Text>
						<Text order="meta" element="span">
							{hit.fields.readingTime.text}
						</Text>
					</ArticleMeta>
					<Heading level={3} id={`${kebabCase(hit.frontmatter.title)}-label`}>
						<Link to={hit.fields.slug}>
							<CustomHighlight attribute="frontmatter.title" hit={hit} tagName="mark" />
						</Link>
					</Heading>
					<Text color="textLighter">
						<CustomHighlight attribute="frontmatter.description" hit={hit} tagName="mark" />
					</Text>
					{hit.frontmatter.tags && hit.frontmatter.tags.length ? (
						<div>
							<span className="sr-only">
								<Heading level={4} id={`${hit.objectID}-tags-label`}>
									Article Tags
								</Heading>
							</span>
							<ul aria-labelledby="article-tags-label">
								{hit.frontmatter.tags.map((tag, index) => (
									<li hoverable={false}>{tag}</li>
								))}
							</ul>
						</div>
					) : null}
				</article>
			</Hit>
		))}
	</HitsList>
);

const CustomHits = connectHits(Hits);

const Search = () => (
	<InstantSearch searchClient={searchClient} indexName="jh_posts">
		<div>
			<CustomSearchBox />
		</div>
		<CustomStateResults>
			<section aria-labelledby="search-results-label">
				<motion.div
					initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
					animate={{ opacity: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 50, mass: 0.1 }}
				>
					<Heading level={4} element="h2" id="search-results-label">
						Search results
					</Heading>
				</motion.div>
				<CustomHits />
			</section>
		</CustomStateResults>
	</InstantSearch>
);

export default Search;

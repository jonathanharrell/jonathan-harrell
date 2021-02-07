import React, { useEffect, useRef } from "react";
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
import Loader from "./Loader";
import { addAlert } from "../helpers";
import NotFound from "../svgs/not-found.svg";
import { Link } from "gatsby";

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
			<label htmlFor="search" className="sr-only">
				Search for articles
			</label>
			<input
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
		<div>
			{hasResults && children}
			{!hasResults && searchState.query && (
				<div>
					<NotFound />
					<h2>No matching search results</h2>
					<p>Try another search term</p>
				</div>
			)}
			{!hasResults && !searchState.query && (
				<div>
					<Loader>
						<span className="sr-only">Loading...</span>
					</Loader>
				</div>
			)}
		</div>
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
	<ul>
		{hits.map(hit => (
			<li key={hit.objectID}>
				<article aria-labelledby={`${kebabCase(hit.frontmatter.title)}-label`}>
					<div>
						<span>
							{new Date(hit.frontmatter.date).toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric"
							})}
						</span>
						<span>{hit.fields.readingTime.text}</span>
					</div>
					<h3 id={`${kebabCase(hit.frontmatter.title)}-label`}>
						<Link to={hit.fields.slug}>
							<CustomHighlight attribute="frontmatter.title" hit={hit} tagName="mark" />
						</Link>
					</h3>
					<p>
						<CustomHighlight attribute="frontmatter.description" hit={hit} tagName="mark" />
					</p>
					{hit.frontmatter.tags && hit.frontmatter.tags.length ? (
						<div>
							<span className="sr-only">
								<h4 id={`${hit.objectID}-tags-label`}>Article Tags</h4>
							</span>
							<ul aria-labelledby="article-tags-label">
								{hit.frontmatter.tags.map((tag, index) => (
									<li hoverable={false}>{tag}</li>
								))}
							</ul>
						</div>
					) : null}
				</article>
			</li>
		))}
	</ul>
);

const CustomHits = connectHits(Hits);

const Search = () => (
	<InstantSearch searchClient={searchClient} indexName="jh_posts">
		<div>
			<CustomSearchBox />
		</div>
		<CustomStateResults>
			<section aria-labelledby="search-results-label">
				<h2 id="search-results-label">Search results</h2>
				<CustomHits />
			</section>
		</CustomStateResults>
	</InstantSearch>
);

export default Search;

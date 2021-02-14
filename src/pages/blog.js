import React, { useEffect, useRef, useState } from "react";
import { navigate } from "@reach/router";
import {
	connectHighlight,
	connectHits,
	connectMenu,
	connectSearchBox,
	connectStateResults,
	InstantSearch
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import qs from "qs";
import { ChevronDown, Search, X } from "react-feather";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import get from "lodash/get";
import ArticleExcerpt from "../components/ArticleExcerpt";
import { addAlert } from "../helpers";

const description =
	"Stay update to date on the latest developments in HTML, CSS and Javascript. Read Jonathan Harrell's blog for tips, tricks and techniques.";

const searchClient = algoliasearch(
	process.env.GATSBY_ALGOLIA_APPLICATION_ID,
	process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
);

const DEFAULT_PROPS = {
	searchClient,
	indexName: "jh_posts"
};

const updateAfter = 700;

const createURL = state => `?${qs.stringify(state)}`;

const pathToSearchState = path =>
	path.includes("?") ? qs.parse(path.substring(path.indexOf("?") + 1)) : {};

const searchStateToURL = searchState =>
	searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : "";

const Menu = ({ items, currentRefinement, refine }) => (
	<div className="relative">
		<select
			className="appearance-none w-full py-2 px-4 rounded bg-gray-100 dark:bg-gray-800 shadow-sm"
			value={currentRefinement || undefined}
			onInput={event => refine(event.target.value || [])}
		>
			<option value={[]}>All posts</option>
			{items
				.sort((a, b) => {
					if (a.label > b.label) return 1;
					if (a.label < b.label) return -1;
					return 0;
				})
				.map(item => (
					<option key={item.label}>{item.label}</option>
				))}
		</select>
		<ChevronDown
			size={20}
			className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none"
		/>
	</div>
);

const SearchBox = ({ currentRefinement, refine }) => {
	const searchRef = useRef();

	useEffect(() => {
		searchRef.current.focus();
	}, []);

	return (
		<div className="relative">
			<label htmlFor="search" className="sr-only">
				Search for articles
			</label>
			<input
				ref={searchRef}
				type="input"
				id="search"
				value={currentRefinement}
				placeholder="Search articles"
				autoComplete="off"
				className="w-full py-2 pl-10 pr-4 rounded bg-gray-100 dark:bg-gray-800 shadow-sm"
				onChange={event => refine(event.currentTarget.value)}
			/>
			<Search
				size={20}
				className="absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none"
			/>
			{currentRefinement && (
				<button
					className="absolute top-1/2 right-3 transform -translate-y-1/2"
					onClick={() => refine()}
				>
					<X size={20} />
				</button>
			)}
		</div>
	);
};

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
			{!searching && !hasResults && searchState.query && (
				<div className="py-16 rounded-xl bg-gray-50 dark:bg-gray-800 text-center">
					<h2 className="text-3xl font-extrabold tracking-tight">
						No matching search results
					</h2>
					<p className="text-lg">Try another search term</p>
				</div>
			)}
			{searching && !hasResults && (
				<p className="text-3xl font-extrabold tracking-tight">Searching...</p>
			)}
		</div>
	);
};

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

const Hits = ({ hits }) => (
	<ul className="space-y-6">
		{hits.map(hit => (
			<li key={hit.objectID}>
				<ArticleExcerpt
					link={hit.fields.slug}
					title={
						<CustomHighlight attribute="frontmatter.title" hit={hit} tagName="mark" />
					}
					excerpt={
						<CustomHighlight
							attribute="frontmatter.description"
							hit={hit}
							tagName="mark"
						/>
					}
					date={new Date(hit.frontmatter.date)}
					color={hit.frontmatter.color || "blue"}
					svg={
						hit.frontmatter.featuredimage
							? hit.frontmatter.featuredimage.fields.markup
							: null
					}
				/>
			</li>
		))}
	</ul>
);

const CustomMenu = connectMenu(Menu);
const CustomSearchBox = connectSearchBox(SearchBox);
const CustomStateResults = connectStateResults(StateResults);
const CustomHits = connectHits(Hits);

const ArticleSearch = ({ searchState, onSearchStateChange, createURL }) => (
	<InstantSearch
		{...DEFAULT_PROPS}
		searchState={searchState}
		onSearchStateChange={onSearchStateChange}
		createURL={createURL}
	>
		<header className="mb-8">
			<h1 className="text-5xl leading-none font-extrabold tracking-tight mb-4">Articles</h1>
		</header>
		<section>
			<div className="sm:flex items-center justify-between mb-6">
				<div className="sm:w-48 mb-4 sm:mb-0">
					<CustomMenu attribute="frontmatter.tags" />
				</div>
				<div className="sm:w-56">
					<CustomSearchBox />
				</div>
			</div>
			<CustomStateResults>
				<CustomHits />
			</CustomStateResults>
		</section>
	</InstantSearch>
);

export const BlogIndexPage = ({ location }) => {
	const [searchState, setSearchState] = useState(pathToSearchState(location.search));
	const [debouncedSetState, setDebouncedSetState] = useState(null);

	useEffect(() => {
		setSearchState(pathToSearchState(location.search));
	}, [location.search]);

	const onSearchStateChange = searchState => {
		clearTimeout(debouncedSetState);

		setDebouncedSetState(
			setTimeout(() => {
				const href = searchStateToURL(searchState);
				navigate(href);
			}, updateAfter)
		);

		setSearchState(searchState);
	};

	return (
		<Layout location={location}>
			<Seo title="Articles" pathname={location.pathname} description={description} />
			<div className="container">
				<div className="max-w-3xl mx-auto py-24">
					<ArticleSearch
						searchState={searchState}
						onSearchStateChange={onSearchStateChange}
						createURL={createURL}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default BlogIndexPage;

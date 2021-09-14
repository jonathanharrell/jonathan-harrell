import React, { Fragment, useEffect, useRef, useState } from "react";
import { navigate } from "@reach/router";
import {
	connectHighlight,
	connectHits,
	connectMenu,
	connectSearchBox,
	connectStateResults,
	InstantSearch
} from "react-instantsearch-dom";
import { Listbox, Transition } from "@headlessui/react";
import algoliasearch from "algoliasearch/lite";
import qs from "qs";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import get from "lodash/get";
import ArticleExcerpt from "../components/ArticleExcerpt";
import { addAlert } from "../helpers";
import { SearchIcon, SelectorIcon, XIcon } from "@heroicons/react/outline";

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

const MenuSelect = ({ items, currentRefinement, refine }) => {
	const options = [
		{
			label: "All posts",
			value: ""
		},
		...items.sort((a, b) => {
			if (a.label > b.label) return 1;
			if (a.label < b.label) return -1;
			return 0;
		})
	];

	return (
		<div className="relative">
			<Listbox value={currentRefinement || ""} onChange={refine}>
				{({ open }) => (
					<>
						<div className="relative mt-1">
							<Listbox.Button className="relative w-full py-2 pl-4 pr-10 text-left bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer">
								<span className="block truncate">
									{currentRefinement || "All posts"}
								</span>
								<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
									<SelectorIcon className="absolute top-1/2 right-3 w-5 h-5 transform -translate-y-1/2 pointer-events-none" />
								</span>
							</Listbox.Button>
							<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options
									static
									className="absolute z-10 w-full max-h-60 py-1 mt-1 overflow-auto text-base bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
								>
									{options.map(option => (
										<Listbox.Option
											key={option.label}
											className={({ active }) =>
												`${active ? "bg-gray-50 dark:bg-gray-900" : ""}
                          cursor-pointer select-none relative py-2 px-6`
											}
											value={
												option.isRefined ? currentRefinement : option.value
											}
										>
											{({ selected, active }) => (
												<span
													className={`${
														selected ? "font-semibold" : "font-normal"
													} block truncate`}
												>
													{option.label}
												</span>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
		</div>
	);
};

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
				className="w-full py-2 pl-10 pr-4 rounded bg-gray-100 dark:bg-gray-800"
				onChange={event => refine(event.currentTarget.value)}
			/>
			<SearchIcon className="absolute top-1/2 left-3 w-5 h-5 transform -translate-y-1/2 pointer-events-none" />
			{currentRefinement && (
				<button
					className="absolute top-1/2 right-3 transform -translate-y-1/2"
					onClick={() => refine()}
				>
					<XIcon className="w-5 h-5" />
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
				<div className="py-16 text-center">
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
	<ul className="grid gap-y-10 gap-x-8 md:grid-cols-2">
		{hits.map((hit, index) => (
			<Fragment key={index}>
				<li>
					<ArticleExcerpt
						link={hit.fields.slug}
						title={
							<CustomHighlight
								attribute="frontmatter.title"
								hit={hit}
								tagName="mark"
							/>
						}
						excerpt={
							<CustomHighlight
								attribute="frontmatter.description"
								hit={hit}
								tagName="mark"
							/>
						}
						date={new Date(hit.frontmatter.date)}
						className="h-full"
					/>
				</li>
				{(index + 1) % 2 === 0 && index < hits.length - 1 && (
					<li
						aria-hidden="true"
						className="hidden md:block md:col-span-2 border-b border-gray-200 dark:border-gray-800"
					/>
				)}
			</Fragment>
		))}
	</ul>
);

const CustomMenuSelect = connectMenu(MenuSelect);
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
		<header className="border-b-2 border-gray-100 dark:border-gray-800 mb-12">
			<h1 className="text-5xl leading-none font-extrabold tracking-tight mb-8">Articles</h1>
			<div className="sm:flex items-center justify-between mb-6">
				<div className="sm:w-48 mb-4 sm:mb-0">
					<CustomMenuSelect attribute="frontmatter.tags" />
				</div>
				<div className="sm:w-56">
					<CustomSearchBox />
				</div>
			</div>
		</header>
		<section>
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
				<div className="max-w-4xl mx-auto py-12">
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

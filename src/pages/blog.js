import React, { useEffect, useRef } from "react";
import { graphql } from "gatsby";
import {
	connectHighlight,
	connectHits,
	connectRefinementList,
	connectSearchBox,
	connectStateResults,
	InstantSearch
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
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

const RefinementList = ({ items, refine }) => (
	<select
		className="appearance-none w-48 py-2 px-4 rounded bg-gray-100 dark:bg-gray-800 shadow-sm"
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
				type="input"
				id="search"
				value={currentRefinement}
				placeholder="Search articles"
				autoComplete="off"
				className="py-2 px-4 rounded bg-gray-100 dark:bg-gray-800 shadow-sm"
				onChange={event => refine(event.currentTarget.value)}
			/>
		</div>
	);
};

const StateResults = ({ searchResults, searchState, children }) => {
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
				<div className="py-16 rounded-xl bg-gray-50 text-center">
					<h2 className="text-3xl font-extrabold tracking-tight">
						No matching search results
					</h2>
					<p className="text-lg">Try another search term</p>
				</div>
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

const CustomRefinementList = connectRefinementList(RefinementList);
const CustomSearchBox = connectSearchBox(SearchBox);
const CustomStateResults = connectStateResults(StateResults);
const CustomHits = connectHits(Hits);

export const BlogIndexPageTemplate = ({ location, tags }) => {
	return (
		<Layout location={location}>
			<Seo title="Articles" pathname={location.pathname} description={description} />
			<div className="container">
				<div className="max-w-3xl mx-auto py-24">
					<InstantSearch searchClient={searchClient} indexName="jh_posts">
						<header className="mb-8">
							<h1 className="text-5xl leading-none font-extrabold tracking-tight mb-4">
								Articles
							</h1>
						</header>
						<section>
							<div className="sm:flex items-center justify-between mb-4">
								<CustomRefinementList attribute="frontmatter.tags" />
								<CustomSearchBox />
							</div>
							<CustomStateResults>
								<CustomHits />
							</CustomStateResults>
						</section>
					</InstantSearch>
				</div>
			</div>
		</Layout>
	);
};

const BlogIndexPage = ({
	location,
	data: {
		allMdx: { tags }
	}
}) => <BlogIndexPageTemplate location={location} tags={tags} />;

export default BlogIndexPage;

export const blogPageQuery = graphql`
	query BlogPage {
		allMdx(limit: 1000) {
			tags: group(field: frontmatter___tags) {
				fieldValue
				totalCount
			}
		}
	}
`;

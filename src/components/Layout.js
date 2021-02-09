import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import Seo from "./seo";
import Header from "./Header";
import Note from "./Note";
import Codepen from "./Codepen";
import ArticleLink from "./ArticleLink";
import Footer from "./Footer";
import ThemeContext from "../context/theme";
import Pre from "./Pre";
import themeColors from "../theme";
import ArticleHeading from "./ArticleHeading";

const Layout = ({ location, color, children, ...props }) => {
	const { theme } = useContext(ThemeContext);
	const mainRef = useRef();

	useEffect(() => {
		document.body.style.opacity = 1;
	});

	const skipToContent = () => {
		mainRef.current.focus();
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Seo />
			<div className="flex flex-col flex-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
				<a
					id="skip-link"
					href="#main"
					className="block absolute z-20 left-4 py-2 px-4 rounded-lg bg-gray-800 shadow-lg hover:shadow-2xl opacity-0 focus:opacity-100 text-gray-100 transform -translate-y-full focus:translate-y-4"
					onClick={skipToContent}
				>
					Skip to content
				</a>
				<Header
					location={location}
					shell={props["*"] === "offline-plugin-app-shell-fallback"}
					color={color}
				/>
				<main
					id="main"
					tabIndex="-1"
					aria-label="Main Content"
					ref={mainRef}
					className="flex-1 outline-none"
				>
					<MDXProvider
						components={{
							h1: props => <h1 className="text-3xl sm:text-4xl font-medium" {...props} />,
							h2: props => (
								<ArticleHeading
									color={color}
									className="mt-16 sm:mt-24 mb-4 text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight"
									{...props}
								/>
							),
							h3: props => <h3 className="mt-10 mb-4 text-xl sm:text-2xl font-bold" {...props} />,
							h4: props => <h4 className="mt-8 mb-4 text-lg sm:text-xl font-semibold" {...props} />,
							h5: props => <h5 className="mt-6 mb-4 sm:text-lg font-semibold" {...props} />,
							h6: props => <h6 className="mt-4 mb-4 font-semibold" {...props} />,
							p: props => <p className="mb-4 sm:text-lg leading-normal" {...props} />,
							ul: props => (
								<ul className="ml-5 mb-4 list-disc sm:text-lg leading-normal" {...props} />
							),
							ol: props => (
								<ol className="ml-5 mb-4 list-disc sm:text-lg leading-normal" {...props} />
							),
							li: props => <li className="mb-2" {...props} />,
							figure: props => <figure className="bg-gray-50 dark:bg-gray-800" {...props} />,
							pre: props => {
								const regex = new RegExp(/language-(.*)/);
								const [, language] = props.className.match(regex);

								return (
									<div className="relative my-6 sm:my-8 -mx-8 sm:mx-0">
										<Pre
											color={color}
											{...props}
											className={`overflow-x-auto whitespace-pre-wrap p-8 sm:rounded-lg bg-gray-50 dark:bg-gray-800 text-base whitespace-pre-wrap text-gray-700 dark:text-gray-300 ${props.className}`}
										/>
										<span className="hidden sm:block absolute top-0 right-0 py-1 px-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 transform -translate-y-1/2">
											{language}
										</span>
									</div>
								);
							},
							code: props => <code className="font-mono text-sm" {...props} />,
							inlineCode: props => (
								<code
									{...props}
									className={`px-1 py-0.5 rounded text-base bg-gray-50 dark:bg-gray-800 ${themeColors[color].text}`}
								/>
							),
							a: props => (
								<a
									className={`sm:text-lg font-medium hover:underline ${themeColors[color].text}`}
									style={{ textUnderlineOffset: "3px" }}
									{...props}
								/>
							),
							Note: props => <Note color={color} {...props} />,
							Codepen,
							ArticleLink
						}}
					>
						{children}
					</MDXProvider>
				</main>
				<Footer />
			</div>
		</div>
	);
};

Layout.propTypes = {
	location: PropTypes.object.isRequired
};

export default Layout;

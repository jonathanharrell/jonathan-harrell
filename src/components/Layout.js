import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import Seo from "./seo";
import Header from "./Header";
import Note from "./Note";
import Example from "./Example";
import ArticleLink from "./ArticleLink";
import Footer from "./Footer";
import Pre from "./Pre";
import ArticleHeading from "./ArticleHeading";
import ThemedImage from "./ThemedImage";
import ThemeContext from "../context/theme";

const Layout = ({ location, color, children, ...props }) => {
	const { themeName } = useContext(ThemeContext);
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
			<div className="flex-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
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
					className="outline-none"
				>
					<MDXProvider
						components={{
							h1: props => (
								<h1 className="text-3xl sm:text-4xl font-medium" {...props} />
							),
							h2: props => (
								<ArticleHeading
									color={color}
									className="mt-16 mb-6 text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
									{...props}
								/>
							),
							h3: props => (
								<h3
									className="mt-10 mb-4 text-xl sm:text-2xl font-bold"
									{...props}
								/>
							),
							h4: props => (
								<h4
									className="mt-8 mb-4 text-lg sm:text-xl font-semibold"
									{...props}
								/>
							),
							h5: props => (
								<h5 className="mt-6 mb-4 sm:text-lg font-semibold" {...props} />
							),
							h6: props => <h6 className="mt-4 mb-4 font-semibold" {...props} />,
							p: props => (
								<p
									className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300"
									{...props}
								/>
							),
							ul: props => (
								<ul
									className="ml-5 mb-6 list-disc sm:text-lg leading-normal text-gray-600 dark:text-gray-300"
									{...props}
								/>
							),
							ol: props => (
								<ol
									className="ml-5 mb-6 list-disc sm:text-lg leading-normal text-gray-600 dark:text-gray-300"
									{...props}
								/>
							),
							li: props => <li className="mb-2" {...props} />,
							figure: props => (
								<figure className="mb-4 bg-gray-50 dark:bg-gray-800" {...props} />
							),
							img: props => <ThemedImage {...props} />,
							pre: props => {
								const regex = new RegExp(/language-(.*)/);
								const [, language] = props.className.match(regex);

								return (
									<div className="relative my-6 sm:my-8 -mx-6 sm:mx-0">
										<Pre
											color="green"
											{...props}
											className={`overflow-x-auto whitespace-pre-wrap p-6 sm:rounded-lg bg-gray-800 selection:bg-black whitespace-pre-wrap text-gray-100 ${props.className}`}
											style={{ fontSize: "0.9rem" }}
										/>
									</div>
								);
							},
							code: props => <code className="font-mono text-sm" {...props} />,
							inlineCode: props => (
								<code
									{...props}
									className="px-0.5 text-base bg-gray-100 dark:bg-gray-800"
								>
									{props.children}
								</code>
							),
							a: props => (
								<a
									className="font-medium hover:underline text-green-500"
									style={{
										textUnderlineOffset: "1px",
										textDecorationThickness: "2px"
									}}
									{...props}
								/>
							),
							Note: props => <Note color={color} {...props} />,
							Example: props => <Example key={themeName} color="green" {...props} />,
							ArticleLink
						}}
					>
						{children}
					</MDXProvider>
				</main>
				<Footer color={color} />
			</div>
		</div>
	);
};

Layout.propTypes = {
	location: PropTypes.object.isRequired
};

export default Layout;

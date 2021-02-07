import React, { Suspense, useCallback, useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { Search as SearchIcon, X } from "react-feather";
import Tippy from "@tippyjs/react";
import Overlay from "./Overlay";
import ThemeContext from "../context/theme";

const Search = React.lazy(() => import("./Search"));

const SearchModal = React.forwardRef(
	({ location, mobileMenuCloseButtonRef, slideDirection, children }, ref) => {
		const { themeName } = useContext(ThemeContext);
		const [expanded, setExpanded] = useState(false);
		const searchButtonRef = useRef();
		const searchWrapRef = useRef();
		const closeButtonRef = useRef();

		useEffect(() => {
			// implement close on document click
			const handleClick = event => {
				if (
					searchWrapRef.current &&
					!searchWrapRef.current.contains(event.target) &&
					searchButtonRef.current !== event.target &&
					!searchButtonRef.current.contains(event.target)
				) {
					close();
				}
			};

			window.addEventListener("click", handleClick);
			window.addEventListener("routeUpdate", close);

			return () => {
				window.removeEventListener("click", handleClick);
				window.removeEventListener("routeUpdate", close);
			};
		}, [close]);

		useEffect(() => {
			if (expanded && searchWrapRef.current.querySelector("input")) {
				// focus search input
				searchWrapRef.current.querySelector("input").focus();
			}
		}, [expanded]);

		useEffect(() => {
			close();
		}, [close, location]);

		const handleKeydown = event => {
			if (!expanded) return;

			const links = searchWrapRef.current.querySelectorAll("a");
			const lastTabbableElement = links[links.length - 1];

			// if tabbing from last link, force close button to get focus
			if (event.key === "Tab" && !event.shiftKey) {
				if (lastTabbableElement === event.target) {
					event.preventDefault();
					closeButtonRef.current.focus();
				}
			}

			// if tabbing backwards from close button, force last link to get focus
			if (event.key === "Tab" && event.shiftKey) {
				if (event.target === closeButtonRef.current) {
					event.preventDefault();
					lastTabbableElement.focus();
				}
			}

			// close search on escape
			if (event.key === "Escape") {
				close();
			}
		};

		const handleSearchModalClick = event => {
			event.stopPropagation();
		};

		const open = () => {
			setExpanded(true);
		};

		const close = useCallback(() => {
			setExpanded(false);

			if (mobileMenuCloseButtonRef) {
				mobileMenuCloseButtonRef.current.focus();
			}
		});

		const searchButtonProps = {
			expanded,
			ariaExpanded: expanded,
			ariaControls: "search",
			onClick: open
		};

		let customSearchButton;

		if (children) {
			customSearchButton = {
				...children,
				ref: searchButtonRef,
				props: {
					...children.props,
					...searchButtonProps
				}
			};
		}

		const x = slideDirection === "right" ? 100 : undefined;

		return (
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			<div ref={ref} onKeyDown={handleKeydown} onClick={handleSearchModalClick}>
				{customSearchButton || (
					<button key={themeName} ref={searchButtonRef} {...searchButtonProps}>
						<span className="sr-only">Open search</span>
						<Tippy
							key={expanded}
							content="Open search"
							placement="bottom"
							animation="shift-away"
							theme="jh"
						>
							<span>
								<SearchIcon />
							</span>
						</Tippy>
					</button>
				)}
				<AnimatePresence>
					{expanded && (
						<Overlay>
							<motion.div
								id="search"
								initial={{
									opacity: 0,
									x
								}}
								animate={{
									opacity: 1,
									x: 0
								}}
								exit={{
									opacity: 0,
									x
								}}
								transition={{ stiffness: 50, mass: 0.1 }}
							>
								<div ref={searchWrapRef}>
									<header>
										<button ref={closeButtonRef} onClick={close}>
											<span className="sr-only">Close Search</span>
											<X />
										</button>
									</header>
									<Suspense fallback={<div>Loading...</div>}>
										<Search />
									</Suspense>
								</div>
							</motion.div>
						</Overlay>
					)}
				</AnimatePresence>
			</div>
		);
	}
);

SearchModal.propTypes = {
	location: PropTypes.object.isRequired,
	slideDirection: PropTypes.oneOf(["bottom", "right"])
};

SearchModal.defaultProps = {
	slideDirection: "right"
};

export default SearchModal;

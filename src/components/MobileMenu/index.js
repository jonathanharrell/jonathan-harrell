import React, { useContext, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { AnimatePresence, motion } from "framer-motion";
import { Search as SearchIcon, X } from "react-feather";
import Text from "../Text";
import Heading from "../Heading";
import { breakpoints } from "../../jh-ui/theme";
import Overlay from "../Overlay";
import SearchModal from "../SearchModal";
import ThemeContext from "../../context/theme";
import {
	CloseButton,
	Menu,
	MenuButton,
	MenuHeader,
	MenuLink,
	MenuLinkWrap,
	MobileMenuWrap,
	SearchButton,
	ThemeOption,
	ThemeOptions
} from "./styles";

const MobileMenu = ({ location }) => {
	const { themeName, setTheme } = useContext(ThemeContext);
	const [visible, setVisibility] = useState(true);
	const [expanded, setExpanded] = useState(false);
	const toggleButtonRef = useRef();
	const menuRef = useRef();
	const closeButtonRef = useRef();
	const menuHeadingRef = useRef();
	const firstTabbableElementRef = useRef();
	const lastTabbableElementRef = useRef();

	useEffect(() => {
		// implement close on document click
		const handleClick = event => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target) &&
				toggleButtonRef.current !== event.target
			) {
				close();
			}
		};

		window.addEventListener("click", handleClick);

		// set up logic ot hide/show mobile menu based on the window width
		const rems = breakpoints.desktop.replace("rem", "");
		const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
		const desktopWidth = rems * fontSize;

		const handleResize = debounce(() => {
			setVisibility(window.innerWidth < desktopWidth);
			if (window.innerWidth >= desktopWidth) close();
		}, 10);

		setVisibility(window.innerWidth < desktopWidth);

		window.addEventListener("resize", handleResize);
		window.addEventListener("routeUpdate", close);

		return () => {
			window.removeEventListener("click", handleClick);
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("routeUpdate", close);
		};
	}, []);

	useEffect(() => {
		close();
	}, [location]);

	useEffect(() => {
		if (visible) {
			if (expanded) {
				// focus menu heading
				closeButtonRef.current.focus();
			} else {
				// focus toggle button
				toggleButtonRef.current.focus();
			}
		}
	}, [visible, expanded]);

	// some links need special logic to determine whether or not they should get the active style
	const isActive = ({ isCurrent, isPartiallyCurrent, href, location }) => {
		const props = {};

		if (href === "/") {
			if (isCurrent) {
				props["data-active"] = true;
				props["aria-current"] = "page";
			}

			return props;
		}

		if (href === "/blog") {
			if (location.pathname.startsWith("/tags")) {
				props["data-active"] = true;
			}
		}

		if (isCurrent || isPartiallyCurrent) {
			props["data-active"] = true;
			props["aria-current"] = "page";
		}

		return props;
	};

	const handleKeydown = event => {
		if (!expanded) return;

		// if tabbing from last link, force close button to get focus
		if (event.key === "Tab" && !event.shiftKey) {
			if (lastTabbableElementRef.current === event.target) {
				event.preventDefault();
				closeButtonRef.current.focus();
			}
		}

		// if tabbing backwards from close button, force last link to get focus
		if (event.key === "Tab" && event.shiftKey) {
			if (event.target === closeButtonRef.current) {
				event.preventDefault();
				lastTabbableElementRef.current.focus();
			}
		}

		// close menu on escape
		if (event.key === "Escape") {
			close();
		}
	};

	const open = () => {
		setExpanded(true);
	};

	const close = () => {
		setExpanded(false);
	};

	const handleThemeChange = event => {
		setTheme(event.target.value);
	};

	return visible ? (
		<MobileMenuWrap onKeyDown={handleKeydown}>
			<MenuButton
				ref={toggleButtonRef}
				expanded={expanded}
				aria-expanded={expanded}
				order="secondary"
				id="site-navigation"
				aria-controls="main-menu"
				title={expanded ? "Close menu" : "Open menu"}
				onClick={open}
			>
				Menu
			</MenuButton>
			<AnimatePresence>
				{expanded && (
					<Overlay>
						<motion.div
							id="main-menu"
							initial={{ opacity: 0, y: 100 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 100 }}
							transition={{ stiffness: 50, mass: 0.1 }}
							style={{
								position: "fixed",
								top: "calc(1rem - 5px)",
								right: "1rem"
							}}
						>
							<Menu ref={menuRef}>
								<div>
									<MenuHeader>
										<span className="sr-only">
											<h2 ref={menuHeadingRef} tabIndex="-1">
												Main Menu
											</h2>
										</span>
										<CloseButton key={themeName} ref={closeButtonRef} onClick={close}>
											<span className="sr-only">Close Menu</span>
											<X />
										</CloseButton>
									</MenuHeader>
									<section aria-labelledby="site-links-label">
										<h3>
											<span className="sr-only" id="site-links-label">
												Site Links
											</span>
											<Text order="meta" aria-hidden>
												Links
											</Text>
										</h3>
										<nav role="navigation">
											<ul>
												<MenuLinkWrap>
													<MenuLink
														to="/"
														rel="home"
														ref={firstTabbableElementRef}
														getProps={isActive}
													>
														<Heading level={1} element="span">
															Home
														</Heading>
													</MenuLink>
												</MenuLinkWrap>
												<MenuLinkWrap>
													<MenuLink to="/blog" getProps={isActive}>
														<Heading level={1} element="span">
															Articles
														</Heading>
													</MenuLink>
												</MenuLinkWrap>
												<MenuLinkWrap>
													<MenuLink to="/about" getProps={isActive}>
														<Heading level={1} element="span">
															About
														</Heading>
													</MenuLink>
												</MenuLinkWrap>
												<MenuLinkWrap>
													<MenuLink to="/work" getProps={isActive}>
														<Heading level={1} element="span">
															Work
														</Heading>
													</MenuLink>
												</MenuLinkWrap>
											</ul>
										</nav>
									</section>
									<section aria-labelledby="theme-settings-label">
										<h3 id="theme-settings-label">
											<span className="sr-only">Theme Settings</span>
											<Text order="meta" aria-hidden>
												Change Theme
											</Text>
										</h3>
										<ThemeOptions>
											<ThemeOption
												htmlFor="light-theme"
												themeName={themeName}
												active={themeName === "light"}
											>
												<Text order="body">Light</Text>
												<span className="sr-only">
													<input
														type="radio"
														id="light-theme"
														name="theme"
														value="light"
														checked={themeName === "light"}
														onChange={handleThemeChange}
													/>
												</span>
											</ThemeOption>
											<ThemeOption
												htmlFor="dark-theme"
												themeName={themeName}
												active={themeName === "dark"}
											>
												<Text order="body">Dark</Text>
												<span className="sr-only">
													<input
														type="radio"
														id="dark-theme"
														name="theme"
														value="dark"
														checked={themeName === "dark"}
														onChange={handleThemeChange}
													/>
												</span>
											</ThemeOption>
										</ThemeOptions>
									</section>
									<section aria-labelledby="search-label">
										<h3 id="search-label">
											<Text order="meta">Site search</Text>
										</h3>
										<div>
											<SearchModal
												location={location}
												mobileMenuCloseButtonRef={closeButtonRef}
												slideDirection="bottom"
											>
												<SearchButton
													key={themeName}
													ref={lastTabbableElementRef}
													themeName={themeName}
												>
													<SearchIcon />
													Search articles
												</SearchButton>
											</SearchModal>
										</div>
									</section>
								</div>
							</Menu>
						</motion.div>
					</Overlay>
				)}
			</AnimatePresence>
		</MobileMenuWrap>
	) : null;
};

export default MobileMenu;

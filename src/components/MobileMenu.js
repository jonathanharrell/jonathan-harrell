import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "react-feather";
import Overlay from "./Overlay";
import ThemeContext from "../context/theme";
import { Link } from "gatsby";

const MobileMenu = ({ location }) => {
	const { themeName, setTheme } = useContext(ThemeContext);
	const [expanded, setExpanded] = useState(false);
	const openButtonRef = useRef();
	const menuRef = useRef();
	const closeButtonRef = useRef();
	const firstTabbableElementRef = useRef();
	const lastTabbableElementRef = useRef();

	const open = () => {
		setExpanded(true);
		if (closeButtonRef.current) closeButtonRef.current.focus();
	};

	const close = useCallback(() => {
		if (expanded && openButtonRef.current) {
			openButtonRef.current.focus();
		}

		setExpanded(false);
	}, [expanded]);

	useEffect(() => {
		const handleClick = event => {
			// if menu link is clicked, close menu (even if route doesn't change)
			if (event.target.href) {
				close();
			}

			// implement close on document click
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target) &&
				openButtonRef.current !== event.target
			) {
				close();
			}
		};

		const handleScroll = () => {
			close();
		};

		window.addEventListener("click", handleClick);
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("click", handleClick);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [close]);

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

	const handleThemeChange = event => {
		setTheme(event.target.value);
	};

	return (
		<div className="sm:hidden" onKeyDown={handleKeydown}>
			<button
				ref={openButtonRef}
				aria-expanded={expanded}
				id="site-navigation"
				aria-controls="main-menu"
				title="Open menu"
				className={`inline-flex py-2 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-semibold transition-colors duration-200 cursor-pointer`}
				onClick={open}
			>
				Menu
			</button>
			<AnimatePresence>
				{expanded && (
					<Overlay>
						<motion.div
							id="main-menu"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ stiffness: 50, mass: 0.1 }}
							style={{
								position: "fixed",
								top: "0",
								right: "0",
								zIndex: "30"
							}}
						>
							<div className="sm:hidden w-screen h-screen">
								<div
									ref={menuRef}
									className="flex flex-col py-5 px-6 h-full bg-white dark:bg-gray-800"
								>
									<header className="flex items-center justify-between mb-2 py-1">
										<span className="sr-only">
											<h2>Main Menu</h2>
										</span>
										<button
											ref={closeButtonRef}
											className="ml-auto text-gray-300 hover:text-gray-400 dark:text-gray-500 dark:hover:text-gray-400"
											onClick={close}
										>
											<span className="sr-only">Close Menu</span>
											<X size={28} />
										</button>
									</header>
									<section aria-labelledby="site-links-label">
										<h3 className="sr-only" id="site-links-label">
											Site Links
										</h3>
										<nav role="navigation">
											<ul>
												<li>
													<Link
														to="/"
														rel="home"
														ref={firstTabbableElementRef}
														className="block text-4xl py-3 font-extrabold tracking-tight text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
													>
														Home
													</Link>
												</li>
												<li>
													<Link
														to="/blog"
														className="block text-4xl py-3 font-extrabold tracking-tight text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
													>
														Articles
													</Link>
												</li>
												<li>
													<Link
														to="/about"
														className="block text-4xl py-3 font-extrabold tracking-tight text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
													>
														About
													</Link>
												</li>
											</ul>
										</nav>
									</section>
									<section
										aria-labelledby="theme-settings-label"
										className="mt-12 py-4"
									>
										<h3
											id="theme-settings-label"
											className="font-medium text-gray-400 dark:text-gray-500"
										>
											<span className="sr-only">Theme Settings</span>
											<span aria-hidden>Change Theme</span>
										</h3>
										<form className="flex mt-4 mb-2">
											<label
												htmlFor="light-theme"
												className={`flex-1 p-2 rounded-tl-xl rounded-bl-xl text-lg font-medium text-center cursor-pointer ${
													themeName === "light"
														? "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
														: "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500"
												}`}
											>
												<span className="ml-2">Light</span>
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
											</label>
											<label
												htmlFor="dark-theme"
												className={`flex-1 p-2 rounded-tr-xl rounded-br-xl text-lg font-medium text-center cursor-pointer ${
													themeName === "dark"
														? "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
														: "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500"
												}`}
											>
												<span className="ml-2">Dark</span>
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
											</label>
										</form>
									</section>
								</div>
							</div>
						</motion.div>
					</Overlay>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MobileMenu;

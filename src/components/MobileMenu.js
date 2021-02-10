import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "react-feather";
import Overlay from "./Overlay";
import ThemeContext from "../context/theme";
import themeColors from "../theme";
import { Link } from "gatsby";

const MobileMenu = ({ location, color }) => {
	const { themeName, setTheme } = useContext(ThemeContext);
	const [expanded, setExpanded] = useState(false);
	const openButtonRef = useRef();
	const menuRef = useRef();
	const closeButtonRef = useRef();
	const firstTabbableElementRef = useRef();
	const lastTabbableElementRef = useRef();

	useEffect(() => {
		// implement close on document click
		const handleClick = event => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target) &&
				openButtonRef.current !== event.target
			) {
				close();
			}
		};

		window.addEventListener("click", handleClick);
		//window.addEventListener("routeUpdate", close);

		return () => {
			window.removeEventListener("click", handleClick);
			//window.removeEventListener("routeUpdate", close);
		};
	}, []);

	useEffect(() => {
		close();
	}, [location]);

	useEffect(() => {
		if (expanded) {
			closeButtonRef.current.focus();
		} else {
			openButtonRef.current.focus();
		}
	}, [expanded]);

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

	return (
		<div className="sm:hidden" onKeyDown={handleKeydown}>
			<button
				ref={openButtonRef}
				aria-expanded={expanded}
				id="site-navigation"
				aria-controls="main-menu"
				title="Open menu"
				className={`inline-flex py-2 px-4 rounded-xl ${
					themeColors[color]
						? `${themeColors[color].gradientButton} text-gray-100`
						: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
				} text-sm font-semibold transition-colors duration-200 cursor-pointer`}
				onClick={open}
			>
				Menu
			</button>
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
								top: "0",
								right: "0",
								zIndex: "30"
							}}
						>
							<div className="sm:hidden w-screen h-screen py-4">
								<div className="container">
									<div
										ref={menuRef}
										className="max-w-sm ml-auto p-4 rounded-xl bg-white dark:bg-gray-800 shadow-2xl"
									>
										<header className="flex items-center justify-between mb-2 py-1 px-4">
											<span className="sr-only">
												<h2>Main Menu</h2>
											</span>
											<button
												ref={closeButtonRef}
												className="ml-auto text-gray-300 dark:text-gray-600"
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
												<ul className="space-y-1">
													<li>
														<Link
															to="/"
															rel="home"
															ref={firstTabbableElementRef}
															className="block py-2 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-xl font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
														>
															Home
														</Link>
													</li>
													<li>
														<Link
															to="/blog"
															className="block py-2 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-xl font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
														>
															Articles
														</Link>
													</li>
													<li>
														<Link
															to="/about"
															className="block py-2 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-xl font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
														>
															About
														</Link>
													</li>
												</ul>
											</nav>
										</section>
										<hr className="m-4 border-1 border-gray-100 dark:border-gray-700" />
										<section aria-labelledby="theme-settings-label" className="py-2 px-4">
											<h3
												id="theme-settings-label"
												className="font-medium text-gray-400 dark:text-gray-600"
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
															: "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500"
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
															: "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500"
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
							</div>
						</motion.div>
					</Overlay>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MobileMenu;

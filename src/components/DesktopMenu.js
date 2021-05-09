import { Link } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import ThemeContext from "../context/theme";

const DesktopMenu = ({ shell }) => {
	const { themeName, setTheme } = useContext(ThemeContext);
	const [darkModeEnabled, setDarkModeEnabled] = useState(false);

	useEffect(() => {
		setDarkModeEnabled(themeName === "dark");
	}, [themeName]);

	// some links need special logic to determine whether or not they should get the active style
	const isActive = ({ isCurrent, isPartiallyCurrent, href }) => {
		const props = {};

		if (href === "/") {
			if (isCurrent) {
				props["data-active"] = true;
				props["aria-current"] = "page";
			}

			return props;
		}

		if (isCurrent || isPartiallyCurrent) {
			props["data-active"] = true;
			props["aria-current"] = "page";
		}

		return props;
	};

	const toggleTheme = () => {
		setTheme(themeName === "light" ? "dark" : "light");
	};

	return (
		<div className="hidden sm:flex flex-1 items-center justify-between">
			<h2 className="sr-only">Main Menu</h2>
			{!shell && (
				<section
					id="site-navigation"
					tabIndex={-1}
					aria-labelledby="site-links-label"
					className="focus:outline-none"
				>
					<h3 id="site-links-label" className="sr-only">
						Site Links
					</h3>
					<nav role="navigation">
						<ul className="flex items-center space-x-8">
							<li>
								<Link
									to="/"
									rel="home"
									getProps={isActive}
									className="py-0.5 text-base font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/blog"
									getProps={isActive}
									className="py-0.5 text-base font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
								>
									Articles
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									getProps={isActive}
									className="py-0.5 text-base font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
								>
									About
								</Link>
							</li>
						</ul>
					</nav>
				</section>
			)}
			<Switch
				checked={darkModeEnabled}
				onChange={toggleTheme}
				className={`${
					darkModeEnabled ? "bg-gray-700" : "bg-gray-200"
				} relative inline-flex items-center h-7 rounded-full w-14`}
			>
				<span className="sr-only">Enable dark mode</span>
				{darkModeEnabled ? (
					<span className="absolute top-1/2 left-1.5 transform -translate-y-1/2">
						<SunIcon className="h-5 w-5 text-gray-300" />
					</span>
				) : (
					<span className="absolute top-1/2 right-1.5 transform -translate-y-1/2">
						<MoonIcon className="h-5 w-5 text-gray-500" />
					</span>
				)}
				<span
					className={`${
						darkModeEnabled ? "translate-x-8" : "translate-x-2"
					} inline-block w-4 h-4 transform bg-white rounded-full`}
				/>
			</Switch>
		</div>
	);
};

export default DesktopMenu;

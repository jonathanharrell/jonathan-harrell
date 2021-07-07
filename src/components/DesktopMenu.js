import { Link } from "gatsby";
import React, { useContext } from "react";
import styled from "styled-components";
import { Moon, Sun } from "react-feather";
import ThemeContext from "../context/theme";

const SiteLink = styled(Link)`
	&[data-active] {
		border-bottom: 2px solid currentColor;
		opacity: 1 !important;
	}
`;

const DesktopMenu = ({ shell, color }) => {
	const { themeName, setTheme } = useContext(ThemeContext);

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
								<SiteLink
									to="/"
									rel="home"
									getProps={isActive}
									className={`py-0.5 text-base font-semibold hover:opacity-75 ${
										color ? "text-gray-100" : ""
									}`}
								>
									Home
								</SiteLink>
							</li>
							<li>
								<SiteLink
									to="/blog"
									getProps={isActive}
									className={`py-0.5 text-base font-semibold hover:opacity-75 ${
										color ? "text-gray-100" : ""
									}`}
								>
									Articles
								</SiteLink>
							</li>
							<li>
								<SiteLink
									to="/about"
									getProps={isActive}
									className={`py-0.5 text-base font-semibold hover:opacity-75 ${
										color ? "text-gray-100" : ""
									}`}
								>
									About
								</SiteLink>
							</li>
						</ul>
					</nav>
				</section>
			)}
			<button
				title={`Change theme to ${themeName === "light" ? "dark" : "light"}`}
				className={`hover:opacity-75 ${color ? "text-gray-100" : ""}`}
				onClick={toggleTheme}
			>
				<span className="sr-only">
					Change theme to {themeName === "light" ? "dark" : "light"}
				</span>
				<span>{themeName === "light" ? <Sun /> : <Moon />}</span>
			</button>
		</div>
	);
};

export default DesktopMenu;

import React from "react";
import { Link as GatsbyLink } from "gatsby";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const Header = ({ location, shell, color }) => (
	<header className="absolute z-10 w-full" aria-label="Site Header">
		<div className="container">
			<div className="flex items-center justify-between max-w-3xl mx-auto py-4 sm:py-5">
				<GatsbyLink
					to="/"
					aria-label="Home page"
					rel="home"
					className={`mr-12 text-base font-semibold ${color ? "text-gray-100" : ""}`}
				>
					Jonathan Harrell
				</GatsbyLink>
				{!shell && <MobileMenu location={location} color={color} />}
				<DesktopMenu location={location} shell={shell} color={color} />
			</div>
		</div>
	</header>
);

export default Header;

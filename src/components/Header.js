import React from "react";
import { Link as GatsbyLink } from "gatsby";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const Header = ({ location, shell, color }) => (
	<header className="absolute z-10 w-full" aria-label="Site Header">
		<div className="container">
			<div className="flex items-center max-w-3xl mx-auto py-4">
				<GatsbyLink
					to="/"
					aria-label="Home page"
					rel="home"
					className={`mr-8 text-base font-semibold ${color ? "text-white" : ""}`}
				>
					Jonathan Harrell
				</GatsbyLink>
				{!shell && <MobileMenu location={location} />}
				<DesktopMenu location={location} shell={shell} color={color} />
			</div>
		</div>
	</header>
);

export default Header;

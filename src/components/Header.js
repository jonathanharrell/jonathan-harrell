import React from "react";
import { Link as GatsbyLink } from "gatsby";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const Header = ({ location, shell }) => (
	<header aria-label="Site Header">
		<div className="container">
			<div className="flex items-center justify-between max-w-4xl mx-auto py-5 sm:py-4">
				<GatsbyLink
					to="/"
					aria-label="Home page"
					rel="home"
					className="flex items-center mr-12 text-base font-semibold"
				>
					Jonathan
					<span className="mx-1 font-bold text-green-400">/</span>
					Harrell
				</GatsbyLink>
				{!shell && <MobileMenu location={location} />}
				<DesktopMenu location={location} shell={shell} />
			</div>
		</div>
	</header>
);

export default Header;

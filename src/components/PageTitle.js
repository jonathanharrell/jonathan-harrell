import React, { useRef } from "react";
import PropTypes from "prop-types";
import { ArrowUp } from "react-feather";

const PageTitle = ({ children, title, ...props }) => {
	const titleContent = useRef();
	const pageTitle = title || (titleContent.current ? titleContent.current.innerText : "");

	return (
		<div {...props}>
			<div className="relative">
				<a
					id="nav-skip-link"
					href="#site-navigation"
					tabIndex="-1"
					aria-label={`${pageTitle}, skip to navigation`}
					className="hidden sm:block absolute top-0 left-0 opacity-0 focus:opacity-100 transform -translate-x-full"
				>
					<ArrowUp />
				</a>
				{children}
			</div>
		</div>
	);
};

PageTitle.propTypes = {
	title: PropTypes.string
};

export default PageTitle;

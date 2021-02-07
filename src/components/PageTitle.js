import React, { useRef } from "react";
import PropTypes from "prop-types";
import { ArrowUp } from "react-feather";

const PageTitle = ({ children, title, ...props }) => {
	const titleContent = useRef();
	const pageTitle = title || (titleContent.current ? titleContent.current.innerText : "");

	return (
		<div {...props}>
			<div>
				<a
					id="nav-skip-link"
					href="#site-navigation"
					tabIndex="-1"
					aria-label={`${pageTitle}, skip to navigation`}
				>
					<ArrowUp />
				</a>
				<span ref={titleContent}>{children}</span>
			</div>
		</div>
	);
};

PageTitle.propTypes = {
	title: PropTypes.string
};

export default PageTitle;

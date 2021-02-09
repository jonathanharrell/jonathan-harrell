import React from "react";
import Layout from "../components/Layout";
import NotFound from "../svgs/not-found.svg";

const NotFoundPage = ({ location }) => (
	<Layout location={location}>
		<div className="container">
			<div className="max-w-3xl mx-auto py-24">
				<header aria-labelledby="about-label">
					<NotFound />
					<h1 id="about-label">Oops! That page can’t be found.</h1>
					<p>It looks like nothing was found at this location.</p>
				</header>
			</div>
		</div>
	</Layout>
);

export default NotFoundPage;

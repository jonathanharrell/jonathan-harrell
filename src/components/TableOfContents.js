import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

const TableOfContents = ({ tableOfContents, articleContent, color }) => {
	const [activeSectionId, setActiveSectionId] = useState("");

	const setActiveSection = useCallback(() => {
		if (articleContent.current) {
			const headings = Array.from(articleContent.current.querySelectorAll("h2"));

			const visibleHeadings = headings.filter(heading => {
				const { bottom } = heading.getBoundingClientRect();
				return bottom <= (window.innerHeight || document.documentElement.clientHeight);
			});

			if (visibleHeadings.length) {
				setActiveSectionId(visibleHeadings[visibleHeadings.length - 1].id);
			} else {
				setActiveSectionId("");
			}
		}
	}, [articleContent]);

	const handleScroll = debounce(() => {
		setActiveSection();
	}, 100);

	useEffect(() => {
		setActiveSection();
	}, [setActiveSection]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	return (
		<ul>
			{tableOfContents.items.map(item => (
				<li key={item.url} className="py-1">
					<a
						href={item.url}
						className={`inline-flex text-base leading-tight opacity-50 hover:opacity-75 ${
							item.url === `#${activeSectionId}` ? "opacity-100" : ""
						}`}
					>
						<span
							className={`block flex-shrink-0 w-2 h-2 mt-1.5 mr-2 rounded-full ${
								item.url === `#${activeSectionId}` ? `bg-green-400` : ""
							}`}
						/>
						{item.title}
					</a>
				</li>
			))}
		</ul>
	);
};

export default TableOfContents;

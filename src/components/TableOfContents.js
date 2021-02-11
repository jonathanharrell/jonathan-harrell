import React from "react";

const TableOfContents = ({ tableOfContents, activeSectionId, color }) => (
	<ul>
		{tableOfContents.items.map(item => (
			<li key={item.url} className="py-1">
				<a
					href={item.url}
					className={`inline-flex text-base leading-tight opacity-50 hover:opacity-75 ${
						item.url === `#${activeSectionId}` ? "opacity-100 font-medium" : ""
					}`}
				>
					<span
						className={`block flex-shrink-0 w-2 h-2 mt-2 mr-2 rounded-full ${
							item.url === `#${activeSectionId}` ? `bg-${color}-400` : ""
						}`}
					/>
					{item.title}
				</a>
			</li>
		))}
	</ul>
);

export default TableOfContents;

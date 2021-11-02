import React, { useEffect, useState } from "react";
import { ChatAlt2Icon, ShareIcon } from "@heroicons/react/solid";

const ArticleShare = ({ location, title, slug, className }) => {
	const [hasNavigatorShare, setHasNavigatorShare] = useState(false);

	const shareArticle = () => {
		try {
			navigator.share({
				title,
				url: `${window.location.origin}${slug}`
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		setHasNavigatorShare(!!navigator.share);
	}, []);

	return (
		<>
			{hasNavigatorShare && (
				<button
					className="flex flex-1 items-center justify-center py-1.5 px-4 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border md:border-l-0 md:border-r-0 border-gray-200 dark:border-gray-700 rounded-lg md:rounded-none text-lg"
					onClick={shareArticle}
				>
					<ShareIcon className="w-5 h-5 mr-2 text-gray-400" />
					<span>Share this article</span>
				</button>
			)}
			{!hasNavigatorShare && location.href && (
				<a
					href={`https://twitter.com/intent/tweet?text=${title}&url=${location.href}`}
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-1 items-center justify-center py-1.5 px-4 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border md:border-l-0 md:border-r-0 border-gray-200 dark:border-gray-700 rounded-lg md:rounded-none text-lg"
				>
					<ChatAlt2Icon className="w-5 h-5 mr-2 text-gray-400" />
					<span>Discuss on Twitter</span>
				</a>
			)}
		</>
	);
};

export default ArticleShare;

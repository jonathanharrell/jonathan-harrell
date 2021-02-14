import React, { useEffect, useState } from "react";
import { GitHub, Share, Twitter } from "react-feather";
import Button from "./Button";

const ArticleShare = ({ location, title, slug }) => {
	const [hasNavigatorShare, setHasNavigatorShare] = useState(false);

	const githubUrl = `https://github.com/jonathanharrell/jonathan-harrell/edit/master/src/content${slug}`;
	const re = new RegExp(/.+?(?=\/$)/);
	const [match] = githubUrl.match(re);
	const processedGithubUrl = `${match}.mdx`;

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
				<Button className="w-full sm:w-auto" onClick={shareArticle}>
					<Share className={`mr-2 w-5 h-5 text-gray-400`} />
					<span>Share this article</span>
				</Button>
			)}
			{!hasNavigatorShare && location.href && (
				<Button
					href={`https://twitter.com/intent/tweet?text=${title}&url=${location.href}`}
					target="_blank"
					rel="noopener noreferrer"
					as="a"
					className="w-full sm:w-auto"
				>
					<Twitter className={`mr-2 w-5 h-5 text-gray-400`} />
					<span>Discuss on Twitter</span>
				</Button>
			)}
			{processedGithubUrl && (
				<Button
					href={processedGithubUrl}
					target="_blank"
					rel="noopener noreferrer"
					as="a"
					className="w-full sm:w-auto"
				>
					<GitHub className={`mr-2 w-5 h-5 text-gray-400`} />
					<span>Edit on Github</span>
				</Button>
			)}
		</>
	);
};

export default ArticleShare;

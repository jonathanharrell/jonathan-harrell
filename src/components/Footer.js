import React from "react";
import { Codepen, GitHub, Instagram, Linkedin, Rss, Twitter } from "react-feather";
import { Link } from "gatsby";
import SubscribeBanner from "./SubscribeBanner";

const currentYear = new Date().getFullYear();

const Footer = ({ color }) => (
	<footer
		aria-labelledby="footer-label"
		className="py-8 sm:py-12 md:py-16 bg-gray-800 dark:bg-gray-800 text-gray-400 dark:text-gray-400"
	>
		<div className="container">
			<div className="max-w-3xl mx-auto">
				<h2 id="footer-label" className="sr-only">
					Site Footer
				</h2>
				<SubscribeBanner color={color} />
				<hr className="my-6 border-1 border-gray-700 dark:border-gray-700" />
				<div className="flex flex-col sm:flex-row items-center justify-between">
					<section aria-labelledby="social-links-label" className="sm:order-1">
						<span className="sr-only">
							<h3 id="social-links-label">Social Links</h3>
						</span>
						<nav className="flex mb-4 sm:mb-0 space-x-6">
							<a
								href="https://twitter.com/HarrellofDurham"
								target="_blank"
								rel="noopener noreferrer"
								title="Twitter"
								className="hover:text-gray-300"
							>
								<span className="sr-only">Twitter</span>
								<Twitter size={20} />
							</a>
							<a
								href="https://www.instagram.com/harrellofdurham/"
								target="_blank"
								rel="noopener noreferrer"
								title="Instagram"
								className="hover:text-gray-300"
							>
								<span className="sr-only">Instagram</span>
								<Instagram size={20} />
							</a>
							<a
								href="https://www.linkedin.com/in/jonathanharrell/"
								target="_blank"
								rel="noopener noreferrer"
								title="LinkedIn"
								className="hover:text-gray-300"
							>
								<span className="sr-only">LinkedIn</span>
								<Linkedin size={20} />
							</a>
							<a
								href="https://github.com/jonathanharrell/"
								target="_blank"
								rel="noopener noreferrer"
								title="Github"
								className="hover:text-gray-300"
							>
								<span className="sr-only">Github</span>
								<GitHub size={20} />
							</a>
							<a
								href="https://codepen.io/jonathanharrell/"
								target="_blank"
								rel="noopener noreferrer"
								title="Codepen"
								className="hover:text-gray-300"
							>
								<span className="sr-only">Codepen</span>
								<Codepen size={20} />
							</a>
							<a href="/rss.xml" title="RSS Feed" className="hover:text-gray-300">
								<span className="sr-only">RSS Feed</span>
								<Rss size={20} />
							</a>
						</nav>
					</section>
					<Link to="/" aria-label="Home page" rel="home" className="hover:text-gray-300">
						&copy; 2017–{currentYear} Jonathan Harrell
					</Link>
				</div>
			</div>
		</div>
	</footer>
);

export default Footer;

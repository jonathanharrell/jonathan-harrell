import React from "react";
import { Codepen, GitHub, Instagram, Linkedin, Rss, Twitter } from "react-feather";
import { Link } from "gatsby";

const currentYear = new Date().getFullYear();

const Footer = () => (
	<footer aria-labelledby="footer-label">
		<div className="container">
			<div className="max-w-3xl mx-auto">
				<h2 id="footer-label" className="sr-only">
					Site Footer
				</h2>
				<Link to="/" aria-label="Home page" rel="home">
					&copy; 2017–{currentYear} Jonathan Harrell
				</Link>
				<section aria-labelledby="social-links-label">
					<span className="sr-only">
						<h3 id="social-links-label">Social Links</h3>
					</span>
					<nav>
						<a
							href="https://twitter.com/HarrellofDurham"
							target="_blank"
							rel="noopener noreferrer"
							title="Twitter"
						>
							<span className="sr-only">Twitter</span>
							<Twitter />
						</a>
						<a
							href="https://github.com/jonathanharrell/"
							target="_blank"
							rel="noopener noreferrer"
							title="Github"
						>
							<span className="sr-only">Github</span>
							<GitHub />
						</a>
						<a
							href="https://codepen.io/jonathanharrell/"
							target="_blank"
							rel="noopener noreferrer"
							title="Codepen"
						>
							<span className="sr-only">Codepen</span>
							<Codepen />
						</a>
						<a
							href="https://www.linkedin.com/in/jonathanharrell/"
							target="_blank"
							rel="noopener noreferrer"
							title="LinkedIn"
						>
							<span className="sr-only">LinkedIn</span>
							<Linkedin />
						</a>
						<a
							href="https://www.instagram.com/harrellofdurham/"
							target="_blank"
							rel="noopener noreferrer"
							title="Instagram"
						>
							<span className="sr-only">Instagram</span>
							<Instagram />
						</a>
						<a href="/rss.xml" title="RSS Feed">
							<span className="sr-only">RSS Feed</span>
							<Rss />
						</a>
					</nav>
				</section>
			</div>
		</div>
	</footer>
);

export default Footer;

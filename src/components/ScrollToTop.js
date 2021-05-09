import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "react-feather";
import debounce from "lodash/debounce";

const ScrollToTop = () => {
	const [scrolled, setScrolled] = useState(false);

	const handleScroll = debounce(() => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
			return setScrolled(false);
		}

		setScrolled(window.scrollY > 100);
	}, 50);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	const scrollToTop = event => {
		event.preventDefault();
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth"
		});
		const navSkipLink = document.getElementById("nav-skip-link");
		if (navSkipLink) navSkipLink.focus();
	};

	return scrolled ? (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 100 }}
				transition={{
					type: "spring",
					stiffness: 50,
					mass: 0.2
				}}
				style={{
					position: "fixed",
					bottom: "1rem",
					right: "1rem"
				}}
			>
				<a
					href="#nav-skip-link"
					className="block p-2 rounded-lg bg-gray-700 shadow-lg hover:shadow-2xl text-gray-100 transform hover:-translate-y-0.5 transition-all ease-in-out duration-150"
					title="Scroll to top"
					onClick={scrollToTop}
				>
					<ArrowUp />
					<span className="sr-only">Scroll to top</span>
				</a>
			</motion.div>
		</AnimatePresence>
	) : null;
};

export default ScrollToTop;

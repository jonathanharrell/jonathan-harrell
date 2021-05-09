import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Overlay = ({ children }) => {
	useEffect(() => {
		const gatsbyWrap = document.getElementById("___gatsby");

		setTimeout(() => {
			gatsbyWrap.setAttribute("aria-hidden", "true");
		}, 0);

		return () => {
			gatsbyWrap.removeAttribute("aria-hidden");
		};
	}, []);

	return typeof document !== "undefined"
		? ReactDOM.createPortal(children, document.getElementById("modal"))
		: null;
};

export default Overlay;

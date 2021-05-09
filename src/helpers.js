export const addAlert = (text, level = "assertive") => {
	if (level === "assertive") {
		document.getElementById("alert-assertive").textContent = text;
	}

	if (level === "polite") {
		document.getElementById("alert-polite").textContent = text;
	}
};

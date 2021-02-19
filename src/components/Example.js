import React from "react";
import EnabledDisabledInputs from "../examples/enabled-disabled-inputs";

const Components = {
	"enabled-disabled-inputs": EnabledDisabledInputs
};

export default ({ name, ...props }) => {
	if (typeof Components[name] !== "undefined") {
		return React.createElement(Components[name], props);
	}
};

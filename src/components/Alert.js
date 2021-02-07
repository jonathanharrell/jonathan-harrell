import React from "react";
import PropTypes from "prop-types";

const getColors = order => {
	switch (order) {
		case "success":
			return "bg-green-50 text-green-600";
		case "warning":
			return "bg-yellow-50 text-yellow-600";
		case "danger":
			return "bg-red-50 text-red-600";
		case "info":
		default:
			return "bg-blue-50 text-blue-600";
	}
};

const Alert = ({ children, order, className, ...props }) => (
	<div className={`px-6 py-3 rounded-lg bg-red-50 ${getColors(order)} ${className}`} {...props}>
		{children}
	</div>
);

Alert.propTypes = {
	order: PropTypes.oneOf(["info", "success", "warning", "danger"])
};

Alert.defaultProps = {
	order: "warning"
};

export default Alert;

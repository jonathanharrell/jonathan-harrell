import React from "react";

const Button = ({ className, children, ...props }) => {
	return (
		<input
			className={`py-3 px-5 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 ${className}`}
			{...props}
		>
			{children}
		</input>
	);
};

export default Button;

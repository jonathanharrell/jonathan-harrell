import React from "react";
import styled from "styled-components";

const Root = styled.button``;

const Button = ({ className, as, children, ...props }) => {
	return (
		<Root
			className={`inline-flex items-center justify-center py-3 px-5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 font-medium text-gray-900 dark:text-gray-100 transition-colors ease-in-out duration-150 ${className}`}
			as={as}
			{...props}
		>
			{children}
		</Root>
	);
};

export default Button;

import React from "react";
import styled from "styled-components";

const Root = styled.button``;

const Button = ({ className, as, children, ...props }) => {
	return (
		<Root
			className={`inline-flex items-center justify-center py-3 px-5 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-lg font-medium cursor-pointer transform hover:-translate-y-0.5 transition-all ease-in-out duration-150 ${className}`}
			as={as}
			{...props}
		>
			{children}
		</Root>
	);
};

export default Button;

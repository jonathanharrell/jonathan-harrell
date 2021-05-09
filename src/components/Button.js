import React from "react";
import styled from "styled-components";

const Root = styled.button``;

const Button = ({ className, as, children, ...props }) => {
	return (
		<Root
			className={`inline-flex items-center justify-center py-2 px-4 rounded-lg bg-green-400 dark:bg-green-500 hover:bg-green-500 dark:hover:bg-green-600 font-semibold text-white text-shadow transition-colors ease-in-out duration-150 ${className}`}
			as={as}
			{...props}
		>
			{children}
		</Root>
	);
};

export default Button;

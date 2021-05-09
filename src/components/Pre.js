import React from "react";
import styled from "styled-components";
import { codeColors } from "../theme";

const StyledPre = styled.pre`
	${({ color }) =>
		Object.entries(codeColors)
			.map(([key, value]) => `.token.${key} { color: ${value}; }`)
			.join("\n")}

	.language-css .token.string,
	.style .token.string {
		color: ${({ color }) => codeColors.operator};
	}

	.token.important,
	.token.bold {
		font-weight: bold;
	}

	.token.italic {
		font-style: italic;
	}

	.token.entity {
		cursor: help;
	}

	.token.attr-name {
		font-style: italic;
	}
`;

const Pre = ({ color, children, ...props }) => {
	return (
		<StyledPre color={color} aria-label={`Code sample`} {...props}>
			{children}
		</StyledPre>
	);
};

export default Pre;

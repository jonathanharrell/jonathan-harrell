import React from "react";
import styled from "styled-components";
import { codeColors } from "../theme";

const StyledPre = styled.pre`
	${({ color }) =>
		Object.entries(codeColors[color] || codeColors.default)
			.map(([key, value]) => `.token.${key} { color: ${value}; }`)
			.join("\n")}

	.token.comment,
	.token.prolog,
	.token.doctype,
	.token.cdata {
		opacity: 0.5;
	}

	.token.namespace {
		opacity: 0.75;
	}

	.language-css .token.string,
	.style .token.string {
		color: ${({ color }) => codeColors[color].operator};
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

import styled from "styled-components";
import { motion } from "framer-motion";

export const HeaderWrap = styled.header`
	position: relative;
	overflow: hidden;
	padding-top: 5rem;
	background-color: var(--backgroundPrimary);
	box-shadow: inset 0 -1px 5px hsl(0, 0%, 0%, 15%);

	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		padding-top: 7rem;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
		padding-top: 10rem;
	}
`;

export const HomeContentWrap = styled.div`
	position: relative;
	padding-top: ${({ theme }) => theme.spacing["3x"]};
	padding-bottom: ${({ theme }) => theme.spacing["3x"]};

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		padding-top: ${({ theme }) => theme.spacing["4x"]};
		padding-bottom: ${({ theme }) => theme.spacing["4x"]};
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		padding-top: ${({ theme }) => theme.spacing["5x"]};
		padding-bottom: ${({ theme }) => theme.spacing["5x"]};
	}
`;

export const Canvas = styled(motion.canvas)`
	position: absolute;
	top: calc(50% - 2rem);
	right: -40%;
	width: 100vw;
	max-width: 50rem;
	height: 100vw;
	max-height: 50rem;
	opacity: 0.75;

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		opacity: 1;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		left: auto;
		right: -12.5%;
		width: 60vw;
		height: 60vw;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
		right: 0;
	}
`;

export const HomeIllustration = styled.img`
	position: absolute;
	top: calc(50% - 2rem);
	right: -40%;
	width: 100vw;
	max-width: 50rem;
	height: 100vw;
	max-height: 50rem;
	opacity: 0.75;
	mix-blend-mode: multiply;
	transform: translateY(-50%);

	@media (prefers-color-scheme: dark) {
		mix-blend-mode: screen;
		filter: invert(1) hue-rotate(183deg);
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		opacity: 1;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		left: auto;
		right: -12.5%;
		width: 60vw;
		height: 60vw;
		transform: translate(0, -50%);
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
		right: 0;
	}
`;

export const HeaderContentWrap = styled.div`
	position: relative;
`;

export const HeaderTextWrap = styled.div`
	position: relative;
	max-width: 28rem;
`;

export const RecentArticlesWrap = styled.section`
	background-color: var(--backgroundSecondary);
`;

export const ExperimentsWrap = styled.section`
	background-color: var(--backgroundInverse);
`;

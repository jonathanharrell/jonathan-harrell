import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Heading from "../components/Heading";
import Text from "../components/Text";
import PageTitle from "../components/PageTitle";
import { shouldAnimate } from "../helpers";
import NotFound from "../svgs/not-found.svg";

const HeaderWrap = styled.header`
	flex: 1;
	padding-top: ${({ theme }) => theme.spacing["3x"]};
	background-color: var(--backgroundPrimary);
	text-align: center;

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		padding-top: ${({ theme }) => theme.spacing["4x"]};
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		padding-top: ${({ theme }) => theme.spacing["5x"]};
	}
`;

const NotFoundContentWrap = styled.div`
	padding-top: ${({ theme }) => theme.spacing["3x"]};
	padding-bottom: ${({ theme }) => theme.spacing["3x"]};

	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		padding-top: ${({ theme }) => theme.spacing["4x"]};
		padding-bottom: ${({ theme }) => theme.spacing["4x"]};
	}
`;

const NotFoundPage = () => (
	<>
		<HeaderWrap aria-labelledby="about-label">
			<NotFoundContentWrap>
				<motion.div
					initial={shouldAnimate() ? { opacity: 0, scale: 0.75 } : false}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ type: "spring", stiffness: 50, mass: 0.1 }}
				>
					<NotFound />
				</motion.div>
				<motion.div
					initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
					animate={{ opacity: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 50, mass: 0.1 }}
				>
					<PageTitle>
						<Heading level={1} id="about-label">
							Oops! That page can’t be found.
						</Heading>
					</PageTitle>
				</motion.div>
				<motion.div
					initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
					animate={{ opacity: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 50, mass: 0.1, delay: 0.1 }}
				>
					<Text>It looks like nothing was found at this location.</Text>
				</motion.div>
			</NotFoundContentWrap>
		</HeaderWrap>
	</>
);

export default NotFoundPage;

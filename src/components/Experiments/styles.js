import styled from 'styled-components'
import { motion } from 'framer-motion'
import ExperimentExcerpt from '../../jh-ui/ExperimentExcerpt'

export const ExperimentsWrap = styled(motion.div)`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl} 0;
  grid-template-columns: repeat(12, 1fr);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-gap: ${({ theme }) => theme.spacing.xxl};
  }

  > *:nth-child(4),
  > *:nth-child(5),
  > *:nth-child(6) {
    display: none;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: block;
    }
  }
`

export const ExperimentExcerptWrap = styled(motion.div)`
  grid-column: 1 / -1;
  height: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 6;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: auto / span 4;
  }
`

export const ExperimentExcerptElevated = styled(ExperimentExcerpt)`
  height: 100%;
  background-color: var(--backgroundElevatedInverse);

  h3 {
    color: var(--textInverse);
  }
`

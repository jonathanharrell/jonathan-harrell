import React from 'react'
import styled from 'styled-components'
import ExperimentExcerpt from '../jh-ui/ExperimentExcerpt'

const ExperimentsWrap = styled.div`
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

const ExperimentExcerptElevated = styled(ExperimentExcerpt)`
  grid-column: 1 / -1;
  height: 100%;
  background-color: var(--backgroundElevatedInverse);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 6;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: auto / span 4;
  }

  h3 {
    color: var(--textInverse);
  }
`

const Experiments = ({ experiments }) => {
  return (
    <ExperimentsWrap>
      {experiments.slice(0, 6).map(experiment => (
        <ExperimentExcerptElevated
          key={experiment.id}
          id={experiment.id}
          title={experiment.title}
          date={new Date(experiment.date)}
        />
      ))}
    </ExperimentsWrap>
  )
}

export default Experiments

import React from 'react'
import styled from 'styled-components'
import ExperimentExcerpt from '../jh-ui/ExperimentExcerpt'

const ExperimentRollWrap = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
  
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

class ExperimentRoll extends React.Component {
  render() {
    return (
      <ExperimentRollWrap>
        <ExperimentExcerptElevated
          date={new Date('September 29, 2018')}
          title="Typographic Details Cheat Sheet"
          viewsCount={210}
        />
        <ExperimentExcerptElevated
          date={new Date('September 29, 2018')}
          title="Semantic Image Grid with Object-Fit"
          viewsCount={441}
        />
        <ExperimentExcerptElevated
          date={new Date('September 29, 2018')}
          title="Live Theming with CSS Variables"
          viewsCount={169}
        />
        <ExperimentExcerptElevated
          date={new Date('September 29, 2018')}
          title="Controlling Element Visibility"
          viewsCount={183}
        />
        <ExperimentExcerptElevated
          date={new Date('September 29, 2018')}
          title="Contextual Callouts with CSS Grid"
          viewsCount={90}
        />
        <ExperimentExcerptElevated
          date={new Date('September 29, 2018')}
          title="Advanced Form Styling with CSS Only"
          viewsCount={1302}
        />
      </ExperimentRollWrap>
    )
  }
}

export default ExperimentRoll

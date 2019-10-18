import React from 'react'
import styled from 'styled-components'
import ExperimentExcerpt from '../jh-ui/ExperimentExcerpt'

const ExperimentRollWrap = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
`

const ExperimentExcerptElevated = styled(ExperimentExcerpt)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundElevatedInverse};

  h3 {
    color: ${({ theme }) => theme.colors.textInverse};
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
      </ExperimentRollWrap>
    )
  }
}

export default ExperimentRoll

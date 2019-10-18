import React from 'react'
import styled from 'styled-components'
import ExperimentExcerpt from '../jh-ui/ExperimentExcerpt'

const ExperimentExcerptElevated = styled(ExperimentExcerpt)`
  background-color: ${({ theme }) => theme.colors.backgroundElevatedInverse};
  
  h3 {
    color: ${({ theme }) => theme.colors.textInverse};
  }
`;

class ExperimentRoll extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ExperimentExcerptElevated
            date={new Date()}
            title="Typographic Details Cheat Sheet"
            viewsCount={210}
          />
        </div>
      </div>
    )
  }
}

export default ExperimentRoll

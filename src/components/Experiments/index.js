import React from 'react'
import PropTypes from 'prop-types'
import { ExperimentExcerptElevated, ExperimentsWrap } from './styles'

const Experiments = ({ experiments }) => (
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

Experiments.propTypes = {
  experiments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Experiments

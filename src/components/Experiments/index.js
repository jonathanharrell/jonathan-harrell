import React from 'react'
import PropTypes from 'prop-types'
import { shouldAnimate } from '../../helpers'
import {
  ExperimentExcerptElevated,
  ExperimentExcerptWrap,
  ExperimentsWrap
} from './styles'

const variants = {
  mounted: {
    transition: { staggerChildren: 0.05, delayChildren: 0.3 }
  }
}

const childVariants = {
  mounted: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      mass: 0.1
    }
  }
}

const Experiments = ({ experiments }) => (
  <ExperimentsWrap animate="mounted" variants={variants}>
    {experiments.slice(0, 6).map(experiment => (
      <ExperimentExcerptWrap
        key={experiment.id}
        variants={childVariants}
        initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
      >
        <ExperimentExcerptElevated
          id={experiment.id}
          title={experiment.title}
          date={new Date(experiment.date)}
        />
      </ExperimentExcerptWrap>
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

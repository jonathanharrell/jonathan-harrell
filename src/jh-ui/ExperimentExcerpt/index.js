import React from 'react'
import PropTypes from 'prop-types'
import Heading from '../Heading'
import Text from '../Text'
import Spaced from '../Spaced'
import Eye from '../../svgs/icons/eye.svg'
import ScreenReaderText from '../ScreenReaderText'
import kebabCase from 'lodash/kebabCase'
import { ExperimentCard, ExperimentMeta, Link } from './styles'

const ExperimentExcerpt = ({ id, date, title, viewsCount, ...props }) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <ExperimentCard
      element="article"
      aria-labelledby={`${kebabCase(title)}-label`}
      {...props}
    >
      <Link
        href={`https://codepen.io/jonathanharrell/details/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ScreenReaderText>
          Go to experiment
        </ScreenReaderText>
      </Link>
      <Spaced bottom="m">
        <Text order="meta">
          <ScreenReaderText>Experiment published date&nbsp;</ScreenReaderText>
          {formattedDate}
        </Text>
      </Spaced>
      <Spaced bottom="l">
        <Heading
          level={3}
          id={`${kebabCase(title)}-label`}
        >
          {title}
        </Heading>
      </Spaced>
      {viewsCount && (
        <ExperimentMeta order="meta">
          <Eye/>
          <Spaced left="xs">
          <span>
            <ScreenReaderText>
              Views count
            </ScreenReaderText>
            {viewsCount}
          </span>
          </Spaced>
        </ExperimentMeta>
      )}
    </ExperimentCard>
  )
}

ExperimentExcerpt.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  viewsCount: PropTypes.number
}

ExperimentExcerpt.defaultProps = {
  date: new Date()
}

export default ExperimentExcerpt

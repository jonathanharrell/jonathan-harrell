import React from 'react'
import { instanceOf, number, string } from 'prop-types'
import styled from 'styled-components'
import Heading from '../Heading'
import Text from '../Text'
import Spaced from '../Spaced'
import Card from '../Card'
import Eye from '../../img/icons/eye.svg'
import ScreenReaderText from '../ScreenReaderText'
import kebabCase from 'lodash/kebabCase'

const ExperimentCard = styled(Card)`
  position: relative;
`

const Link = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;

  &:focus {
    box-shadow: none;
  }
`

const ExperimentMeta = styled(Text)`
  display: flex;
  align-items: center;
`

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
  id: string.isRequired,
  date: instanceOf(Date).isRequired,
  title: string.isRequired,
  viewsCount: number
}

ExperimentExcerpt.defaultProps = {
  date: new Date()
}

export default ExperimentExcerpt

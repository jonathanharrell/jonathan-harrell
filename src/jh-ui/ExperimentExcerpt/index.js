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

const ExperimentMeta = styled(Text)`
  display: flex;
  align-items: center;
`

const ExperimentExcerpt = ({ date, title, viewsCount, ...props }) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <Card
      element="article"
      aria-labelledby={`${kebabCase(title)}-label`}
      {...props}
    >
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
    </Card>
  )
}

ExperimentExcerpt.propTypes = {
  date: instanceOf(Date),
  title: string.isRequired,
  viewsCount: number.isRequired
}

ExperimentExcerpt.defaultProps = {
  date: new Date()
}

export default ExperimentExcerpt

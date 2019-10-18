import React from 'react'
import { instanceOf, number, string } from 'prop-types'
import styled from 'styled-components'
import Heading from '../Heading'
import Text from '../Text'
import Spaced from '../Spaced'
import Card from '../Card'
import Eye from '../../img/icons/eye.svg'

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
    <Card element="article" {...props}>
      <Spaced bottom="m">
        <Text order="meta">
          {formattedDate}
        </Text>
      </Spaced>
      <Spaced bottom="l">
        <Heading level={3}>
          {title}
        </Heading>
      </Spaced>
      <ExperimentMeta order="meta">
        <Eye/>
        <Spaced left="xs">
          <span>{viewsCount}</span>
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

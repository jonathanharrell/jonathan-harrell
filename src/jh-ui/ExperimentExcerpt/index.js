import React from 'react'
import { instanceOf, number, string } from 'prop-types'
import Heading from '../Heading'
import Text from '../Text'
import Spaced from '../Spaced'
import Card from '../Card'

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
      <Text order="meta">
        {viewsCount}
      </Text>
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

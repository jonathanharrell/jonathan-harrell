import React from 'react'
import styled from 'styled-components'
import { oneOf, instanceOf, arrayOf, string } from 'prop-types'
import { breakpoints } from '../themes'
import Card from '../Card'
import Heading from '../Heading'
import Text from '../Text'
import Spaced from '../Spaced'

const ArticleExcerpt = ({ date, title, excerpt, tags, ...props }) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  const tagsString = tags.join(' • ')

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
      <Text order="body">
        {excerpt}
      </Text>
      {tagsString && (
        <Spaced top="xl">
          <Text order="meta">
            {tagsString}
          </Text>
        </Spaced>
      )}
    </Card>
  )
}

ArticleExcerpt.propTypes = {
  date: instanceOf(Date),
  title: string.isRequired,
  excerpt: string.isRequired,
  tags: arrayOf(string)
}

ArticleExcerpt.defaultProps = {
  date: new Date(),
  tags: []
}

export default ArticleExcerpt

import React from 'react'
import styled from 'styled-components'
import { arrayOf, instanceOf, string } from 'prop-types'
import Card from '../Card'
import Heading from '../Heading'
import Text from '../Text'
import Spaced from '../Spaced'
import { Link as GatsbyLink } from 'gatsby'

const ArticleCard = styled(Card)`
  position: relative;
`

const Link = styled(GatsbyLink)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
`

const ArticleExcerpt = ({ link, date, title, excerpt, tags, ...props }) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  const tagsString = tags.join(' • ')

  return (
    <ArticleCard element="article" {...props}>
      <Link to={link}/>
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
    </ArticleCard>
  )
}

ArticleExcerpt.propTypes = {
  link: string.isRequired,
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

import React from 'react'
import PropTypes from 'prop-types'
import kebabCase from 'lodash/kebabCase'
import Heading from '../Heading'
import Text from '../Text'
import Spaced from '../Spaced'
import Padded from '../Padded'
import ScreenReaderText from '../ScreenReaderText'
import { ArticleCard, CardContent, ImageWrap, Link } from './styles'

const ArticleExcerpt = ({ link, image, svg, date, title, excerpt, ...props }) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <ArticleCard
      padding={false}
      element="article"
      aria-labelledby={`${kebabCase(title)}-label`}
      {...props}
    >
      <Link to={link}>
        <ScreenReaderText>
          Go to article
        </ScreenReaderText>
      </Link>
      <CardContent>
        {image && (
          <ImageWrap>
            {image && (
              <img
                src={image.publicURL}
                alt=""
                role="presentation"
              />
            )}
          </ImageWrap>
        )}
        {svg && (
          <ImageWrap dangerouslySetInnerHTML={{ __html: svg || undefined }}/>
        )}
        <Padded top="xxl" left="xxl" right="xxl" bottom="2x">
          <div>
            <Spaced bottom="m">
              <Text order="meta">
                <ScreenReaderText>Article published date&nbsp;</ScreenReaderText>
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
            <Text order="body">
              {excerpt}
            </Text>
          </div>
        </Padded>
      </CardContent>
    </ArticleCard>
  )
}

ArticleExcerpt.propTypes = {
  link: PropTypes.string.isRequired,
  image: PropTypes.shape({
    publicURL: PropTypes.string.isRequired,
    alt: PropTypes.string,
    title: PropTypes.string
  }),
  svg: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired
}

ArticleExcerpt.defaultProps = {
  date: new Date()
}

export default ArticleExcerpt

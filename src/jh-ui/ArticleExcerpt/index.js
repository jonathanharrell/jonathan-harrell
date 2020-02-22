import React from 'react'
import { instanceOf, oneOf, shape, string } from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import Card from '../Card'
import Heading from '../Heading'
import Text from '../Text'
import Spaced from '../Spaced'
import Padded from '../Padded'
import ScreenReaderText from '../ScreenReaderText'

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

  &:focus {
    box-shadow: none;
  }
`

export const CardContent = styled.div`
  height: 100%;
`

export const ImageWrap = styled.figure`
  position: relative;
  overflow: hidden;
  padding: 25% 0;
  background-color: var(--backgroundSecondary);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 30% 0;
  }

  svg {
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: auto;
    transform: translateY(-50%);
  }
`

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
        {(image || svg) && (
          <ImageWrap dangerouslySetInnerHTML={{ __html: svg || undefined }}>
            {image && (
              <img
                src={image.publicURL}
                alt=""
                role="presentation"
              />
            )}
          </ImageWrap>
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
  link: string.isRequired,
  image: shape({
    publicURL: string
  }),
  imagePosition: oneOf(['top', 'left', 'right']),
  imageRatio: oneOf([1 / 2, 2 / 3]),
  date: instanceOf(Date),
  title: string.isRequired,
  excerpt: string.isRequired,
  svg: string
}

ArticleExcerpt.defaultProps = {
  imagePosition: 'top',
  imageRatio: 1 / 2,
  date: new Date()
}

export default ArticleExcerpt

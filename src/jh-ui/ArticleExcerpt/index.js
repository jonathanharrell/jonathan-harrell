import React from 'react'
import styled from 'styled-components'
import { arrayOf, instanceOf, oneOf, string } from 'prop-types'
import kebabCase from 'lodash/kebabCase'
import Card from '../Card'
import Heading from '../Heading'
import Text from '../Text'
import Spaced from '../Spaced'
import { Link as GatsbyLink } from 'gatsby'
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

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: repeat(${({ imageRatio }) => imageRatio === 1 / 2 ? '2' : '3'}, 1fr);
    grid-gap: 0 ${({ theme }) => theme.spacing.xxl};
  }
`

const getImageColumns = ({ imagePosition, imageRatio }) => {
  if (imagePosition === 'left') {
    return imageRatio === 1 / 2 ? 'grid-column: auto / span 1' : 'grid-column: auto / span 2'
  }
  if (imagePosition === 'right') {
    return imageRatio === 1 / 2 ? 'grid-column: 2 / 3' : 'grid-column: 2 / 4'
  }
}

const getImageWrapBackgroundColor = color => {
  switch (color) {
    case 'blue':
      return 'var(--backgroundInverse)'
    case 'orange':
      return 'var(--accent)'
    case 'gray':
    default:
      return 'var(--backgroundSecondary)'
  }
}

export const ImageWrap = styled.figure`
  grid-column: 1 / -1;
  background-color: ${({ color }) => getImageWrapBackgroundColor(color)};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    ${({ imagePosition, imageRatio }) => getImageColumns({ imagePosition, imageRatio })};
    ${({ imagePosition }) => imagePosition !== 'top' ? `grid-row: 1 / -1` : `grid-row: 1 / 2`};
  }
`

const Image = styled.img`
  display: block;
  max-width: 100%;
  height: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const CardText = styled.div`
  grid-column: 1 / -1;

  ${({ imagePosition, theme }) => imagePosition !== 'top' ? `
    @media (min-width: ${theme.breakpoints.desktop}) {
      grid-row: 1 / -1;
    }
  ` : ``};

  ${({ image, imagePosition, theme }) => image ? `
    @media (min-width: ${theme.breakpoints.desktop}) {
      ${imagePosition === 'left' ? `
        grid-column: auto / -1;
        padding-left: 0;
      ` : ''};
      ${imagePosition === 'right' ? `
        grid-column: auto / span 1;
        padding-right: 0;
      ` : ''}
    }` : ``
}
`

const Tags = styled.ul`
  list-style: none;

  li {
    display: inline-block;
  }
`

const ArticleExcerpt = ({ link, color, image, imagePosition, imageRatio, date, title, excerpt, tags, ...props }) => {
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
      <CardContent imageRatio={imageRatio}>
        {image && (
          <ImageWrap
            imagePosition={imagePosition}
            imageRatio={imageRatio}
            color={color}
          >
            <Image
              // src={image}
              color={color}
              role="presentation"
            />
          </ImageWrap>
        )}
        <Padded all="xxl">
          <CardText
            image={image}
            imagePosition={imagePosition}
          >
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
            {tags.length && (
              <Spaced top="xl">
                <ScreenReaderText>
                  <Heading
                    level={4}
                    id={`${kebabCase(title)}-label`}
                  >
                    Article Tags
                  </Heading>
                </ScreenReaderText>
                <Tags aria-labelledby={`${kebabCase(title)}-label`}>
                  {tags.map((tag, index) => (
                    <li key={tag}>
                      <Text order="meta">
                        {index !== 0 && (
                          <span
                            dangerouslySetInnerHTML={{ __html: '&nbsp;&nbsp;•&nbsp;&nbsp;' }}
                            aria-hidden={true}
                          />
                        )}
                        {tag}
                      </Text>
                    </li>
                  ))}
                </Tags>
              </Spaced>
            )}
          </CardText>
        </Padded>
      </CardContent>
    </ArticleCard>
  )
}

ArticleExcerpt.propTypes = {
  link: string.isRequired,
  color: string.isRequired,
  image: Object,
  imagePosition: oneOf(['top', 'left', 'right']),
  imageRatio: oneOf([1 / 2, 2 / 3]),
  date: instanceOf(Date),
  title: string.isRequired,
  excerpt: string.isRequired,
  tags: arrayOf(string)
}

ArticleExcerpt.defaultProps = {
  imagePosition: 'top',
  imageRatio: 1 / 2,
  date: new Date(),
  tags: []
}

export default ArticleExcerpt

import React from 'react'
import styled from 'styled-components'
import { arrayOf, instanceOf, oneOf, string } from 'prop-types'
import Card from '../Card'
import Heading from '../Heading'
import Text from '../Text'
import Spaced from '../Spaced'
import { Link as GatsbyLink } from 'gatsby'
import Padded from '../Padded'

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

const CardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ imageRatio }) => imageRatio === 1 / 2 ? '2' : '3'}, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.xxl};
  height: 100%;
`

const getImageColumns = ({ imagePosition, imageRatio }) => {
  if (imagePosition === 'right') {
    return imageRatio === 1 / 2 ? 'grid-column: 2 / 3' : 'grid-column: 2 / 4'
  } else {
    return imageRatio === 1 / 2 ? 'grid-column: auto / span 1' : 'grid-column: auto / span 2'
  }
}

const Image = styled.img`
  ${({ imageBreakpoint }) => imageBreakpoint ? 'display: none' : 'display: block'};
  grid-column: 1 / -1;
  max-width: 100%;
  height: auto;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${({ imagePosition, imageRatio }) => getImageColumns({ imagePosition, imageRatio })};
    grid-row: 1 / -1;
  }
  
  ${({ imageBreakpoint, theme }) => imageBreakpoint ? `
    @media (min-width: ${theme.breakpoints[imageBreakpoint]}) {
      display: block;
    }
  ` : ''};
`

const CardText = styled.div`
  grid-column: 1 / -1;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-row: 1 / -1;
  }
  
  ${({ image, imagePosition, imageBreakpoint, theme }) => image && imageBreakpoint ? `
    @media (min-width: ${theme.breakpoints[imageBreakpoint]}) {
      ${imagePosition === 'right' ? 'grid-column: auto / span 1' : 'grid-column: auto / -1'}
    }` : image ? `
    @media (min-width: ${theme.breakpoints.tablet}) {
      ${image ? (imagePosition === 'right' ? 'grid-column: auto / span 1' : 'grid-column: auto / -1') : ''};
    }
  ` : ''};

  ${({ image, imagePosition }) => image ? (imagePosition === 'right' ? 'padding-right: 0' : 'padding-left: 0') : ''};
`

const ArticleExcerpt = ({ link, image, imagePosition, imageRatio, imageBreakpoint, date, title, excerpt, tags, ...props }) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  const tagsString = tags.join(' • ')

  return (
    <ArticleCard
      padding={false}
      element="article"
      {...props}
    >
      <Link to={link} aria-label={title}/>
      <CardContent imageRatio={imageRatio}>
        {image && (
          <Image
            src={image}
            imagePosition={imagePosition}
            imageRatio={imageRatio}
            imageBreakpoint={imageBreakpoint}
          />
        )}
        <Padded all="xxl">
          <CardText
            image={image}
            imagePosition={imagePosition}
            imageBreakpoint={imageBreakpoint}
          >
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
          </CardText>
        </Padded>
      </CardContent>
    </ArticleCard>
  )
}

ArticleExcerpt.propTypes = {
  link: string.isRequired,
  image: string,
  imagePosition: oneOf(['left', 'right']),
  imageRatio: oneOf([1 / 2, 2 / 3]),
  imageBreakpoint: oneOf(['mobile', 'tablet', 'desktop', 'desktopLarge']),
  date: instanceOf(Date),
  title: string.isRequired,
  excerpt: string.isRequired,
  tags: arrayOf(string)
}

ArticleExcerpt.defaultProps = {
  imagePosition: 'left',
  imageRatio: 1 / 2,
  date: new Date(),
  tags: []
}

export default ArticleExcerpt

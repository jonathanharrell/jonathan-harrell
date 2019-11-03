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

export const ImageWrap = styled.figure`
  grid-column: 1 / -1;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    ${({ imagePosition, imageRatio }) => getImageColumns({ imagePosition, imageRatio })};
    grid-row: 1 / -1;
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
  ` : ''};
  
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

const ArticleExcerpt = ({ link, image, imagePosition, imageRatio, date, title, excerpt, tags, ...props }) => {
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
          <ImageWrap
            imagePosition={imagePosition}
            imageRatio={imageRatio}
          >
            <Image
              src={image}
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

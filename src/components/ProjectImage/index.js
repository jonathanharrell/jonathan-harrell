import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Image from 'gatsby-image'
import ThemeContext from '../../context/theme'

const ProjectImage = ({ image, ...props }) => {
  const { themeName } = useContext(ThemeContext)

  return (
    <figure {...props}>
      {themeName && (
        <Image
          alt={image.alt || ''}
          fluid={image[themeName].childImageSharp.fluid}
        />
      )}
      <noscript>
        <picture>
          <source
            srcSet={image.dark.publicURL}
            media="(prefers-color-scheme: dark)"
          />
          <source
            srcSet={image.light.publicURL}
            media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
          />
          <img src={image.light.publicURL} alt="" />
        </picture>
      </noscript>
    </figure>
  )
}

ProjectImage.propTypes = {
  image: PropTypes.shape({
    light: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object.isRequired
      }).isRequired
    }).isRequired,
    dark: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object.isRequired
      }).isRequired
    }).isRequired,
    alt: PropTypes.string
  }).isRequired
}

export default ProjectImage

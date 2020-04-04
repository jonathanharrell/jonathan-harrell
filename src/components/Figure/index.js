import React from 'react'
import Text from '../../jh-ui/Text'
import Spaced from '../../jh-ui/Spaced'

const Figure = ({ children, ...props }) => {
  const image = children.props.children.find(
    child =>
      child.props &&
      (child.props.originalType === 'svg' || child.props.originalType === 'img')
  )

  const caption = children.props.children.find(
    child => child.props && child.props.originalType === 'figcaption'
  )

  return (
    <figure {...props}>
      {image}
      {caption && (
        <Spaced top="s">
          <Text order="caption" element="figcaption">
            {caption.props.children}
          </Text>
        </Spaced>
      )}
    </figure>
  )
}

export default Figure

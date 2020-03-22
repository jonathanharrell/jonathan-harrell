import React from 'react'
import PropTypes from 'prop-types'
import { Root } from './styles'

const Heading = ({ level, color, element, children, ...props }) => (
  <Root
    level={level}
    color={color}
    as={element ? element : `h${level}`}
    {...props}
  >
    {children}
  </Root>
)

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  color: PropTypes.oneOf(['text', 'textLighter', 'textInverse']),
  element: PropTypes.string
}

Heading.defaultProps = {
  level: 1
}

export default Heading

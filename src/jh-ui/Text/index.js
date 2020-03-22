import React from 'react'
import PropTypes from 'prop-types'
import { Root } from './styles'

const Text = ({ order, color, element, children, ...props }) => (
  <Root order={order} color={color} as={element} {...props}>
    {children}
  </Root>
)

Text.propTypes = {
  order: PropTypes.oneOf(['body', 'caption', 'meta']),
  color: PropTypes.oneOf(['text', 'textLighter', 'textInverse']),
  element: PropTypes.string
}

Text.defaultProps = {
  order: 'body',
  element: 'p'
}

export default Text

import React from 'react'
import PropTypes from 'prop-types'
import { Root } from './styles'

const Ul = ({ color, children, ...props }) => (
  <Root color={color} {...props}>
    {children}
  </Root>
)

Ul.propTypes = {
  color: PropTypes.oneOf(['text', 'textLighter', 'textInverse'])
}

Ul.defaultProps = {
  color: 'text'
}

export default Ul

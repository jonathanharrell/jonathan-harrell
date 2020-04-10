import React from 'react'
import PropTypes from 'prop-types'
import { Root } from './styles'

const Tag = ({ inert, children, ...props }) => (
  <Root inert={inert} {...props}>
    {children}
  </Root>
)

Tag.propTypes = {
  inert: PropTypes.bool
}

Tag.defaultProps = {
  inert: false
}

export default Tag

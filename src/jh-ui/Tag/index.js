import React from 'react'
import PropTypes from 'prop-types'
import { Root } from './styles'

const Tag = ({ hoverable, children, ...props }) => (
  <Root hoverable={hoverable.toString()} {...props}>
    {children}
  </Root>
)

Tag.propTypes = {
  hoverable: PropTypes.bool
}

Tag.defaultProps = {
  hoverable: true
}

export default Tag

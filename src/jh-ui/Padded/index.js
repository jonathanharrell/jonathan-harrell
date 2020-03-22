import React from 'react'
import PropTypes from 'prop-types'
import { Root } from './styles'

const Padded = (props) => (
  <Root {...props}/>
)

const spacing = ['xs', 's', 'm', 'l', 'xl', 'xxl', '2x', '3x', '4x', '5x']

Padded.propTypes = {
  all: PropTypes.oneOf(spacing),
  vertical: PropTypes.oneOf(spacing),
  horizontal: PropTypes.oneOf(spacing),
  top: PropTypes.oneOf(spacing),
  right: PropTypes.oneOf(spacing),
  bottom: PropTypes.oneOf(spacing),
  left: PropTypes.oneOf(spacing),
}

export default Padded

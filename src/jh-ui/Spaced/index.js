import React from 'react'
import { oneOf } from 'prop-types'
import { Root } from './styles'

const Spaced = props => <Root {...props} />

const spacing = ['xs', 's', 'm', 'l', 'xl', 'xxl', '2x', '3x', '4x', '5x']

Spaced.propTypes = {
  all: oneOf(spacing),
  vertical: oneOf(spacing),
  horizontal: oneOf(spacing),
  top: oneOf(spacing),
  right: oneOf(spacing),
  bottom: oneOf(spacing),
  left: oneOf(spacing)
}

export default Spaced

import React from 'react'
import styled from 'styled-components'
import Primitive from '../Primitive'
import { oneOf } from 'prop-types'

const Root = styled(Primitive)`
  ${({ theme, all, vertical, horizontal, top, right, bottom, left }) => {
  let str = ''

  if (all) {
    str += `padding: ${theme.spacing[all]}`
  }
  if (vertical) {
    str += `padding-top: ${theme.spacing[vertical]}; padding-bottom: ${theme.spacing[vertical]};`
  }
  if (horizontal) {
    str += `padding-left: ${theme.spacing[horizontal]}; padding-right: ${theme.spacing[horizontal]};`
  }
  if (top) {
    str += `padding-top: ${theme.spacing[top]};`
  }
  if (right) {
    str += `padding-right: ${theme.spacing[right]};`
  }
  if (bottom) {
    str += `padding-bottom: ${theme.spacing[bottom]};`
  }
  if (left) {
    str += `padding-left: ${theme.spacing[left]};`
  }

  return str
}}
`

const Padded = (props) => (
  <Root {...props}/>
)

const spacing = ['xs', 's', 'm', 'l', 'xl', 'xxl', '2x', '3x']

Padded.propTypes = {
  all: oneOf(spacing),
  vertical: oneOf(spacing),
  horizontal: oneOf(spacing),
  top: oneOf(spacing),
  right: oneOf(spacing),
  bottom: oneOf(spacing),
  left: oneOf(spacing),
}

export default Padded

import React from 'react'
import styled from 'styled-components'
import Primitive from '../Primitive'

const Root = styled(Primitive)`
  ${({ theme, top, right, bottom, left, vertical, horizontal, all }) => {
    let str = ''
  
    if (all) {
      str += `margin: ${theme.spacing[all]}`
    }
    if (horizontal) {
      str += `margin-left: ${theme.spacing[horizontal]}; margin-right: ${theme.spacing[horizontal]};`
    }
    if (vertical) {
      str += `margin-top: ${theme.spacing[vertical]}; margin-bottom: ${theme.spacing[vertical]};`
    }
    if (left) {
      str += `margin-left: ${theme.spacing[left]};`
    }
    if (bottom) {
      str += `margin-bottom: ${theme.spacing[bottom]};`
    }
    if (right) {
      str += `margin-right: ${theme.spacing[right]};`
    }
    if (top) {
      str += `margin-top: ${theme.spacing[top]};`
    }
    
    return str
}}
`

const Spaced = (props) => (
  <Root {...props}/>
)

export default Spaced

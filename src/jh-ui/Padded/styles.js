import styled from 'styled-components'
import Primitive from '../Primitive'

export const Root = styled(Primitive)`
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

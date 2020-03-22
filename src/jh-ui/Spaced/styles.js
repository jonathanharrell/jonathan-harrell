import styled from 'styled-components'
import Primitive from '../Primitive'

export const Root = styled(Primitive)`
  ${({ theme, all, vertical, horizontal, top, right, bottom, left }) => {
  let str = ''

  if (all) {
    str += `margin: ${theme.spacing[all]} !important`
  }
  if (vertical) {
    str += `margin-top: ${theme.spacing[vertical]} !important; margin-bottom: ${theme.spacing[vertical]} !important;`
  }
  if (horizontal) {
    str += `margin-left: ${theme.spacing[horizontal]} !important; margin-right: ${theme.spacing[horizontal]} !important;`
  }
  if (top) {
    str += `margin-top: ${theme.spacing[top]} !important;`
  }
  if (right) {
    str += `margin-right: ${theme.spacing[right]} !important;`
  }
  if (bottom) {
    str += `margin-bottom: ${theme.spacing[bottom]} !important;`
  }
  if (left) {
    str += `margin-left: ${theme.spacing[left]} !important;`
  }

  return str
}}
`

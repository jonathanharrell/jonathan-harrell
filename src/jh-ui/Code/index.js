import React from 'react'
import { StyledCode } from './styles'

const Code = ({ children, ...props }) => (
  <StyledCode {...props}>{children}</StyledCode>
)

export default Code

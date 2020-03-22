import React from 'react'
import { StyledPre } from './styles'

const Pre = ({ children, ...props }) => (
  <StyledPre aria-label={`Code sample (${props.className})`} {...props}>
    {children}
  </StyledPre>
)

export default Pre

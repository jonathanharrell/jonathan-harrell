import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../themes'

const StyledCode = styled.code`
  font-size: 1.125rem;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 1.25rem;
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: 1.375rem;
  }
`

const Code = ({ children, ...props }) => (
  <StyledCode {...props}>
    {children}
  </StyledCode>
)

export default Code

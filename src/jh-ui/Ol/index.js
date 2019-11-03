import React from 'react'
import styled from 'styled-components'

const Root = styled.ol`
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme }) => theme.fontSizes.m.mobile};
  color: var(--text);
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.m.tablet};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.m.desktop};
  }
`

const Ol = ({ children, ...props }) => (
  <Root {...props}>
    {children}
  </Root>
)

export default Ol

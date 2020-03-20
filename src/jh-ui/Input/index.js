import React from 'react'
import styled from 'styled-components'

const Root = styled.input`
  height: 3rem;
  padding: 0 ${({ theme }) => theme.spacing.m};
  border: 0;
  background-color: var(--backgroundSecondary);
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme }) => theme.fontSizes.m.mobile};
  color: var(--text);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.m.tablet};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.m.desktop};
  }

  ::placeholder {
    color: var(--textLighter);
  }
`

const Input = React.forwardRef(({ children, type, ...props }, ref) => (
  <Root ref={ref} type={type} {...props}>
    {children}
  </Root>
))

export default Input

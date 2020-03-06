import React from 'react'
import styled from 'styled-components'

const Root = styled.ul`
  margin-left: 1rem;
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme }) => theme.fontSizes.m.mobile};
  line-height: 1.5;
  color: ${({ color }) => `var(--${color})`};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.m.tablet};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.m.desktop};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`

const Ul = ({ children, color, ...props }) => (
  <Root color={color} {...props}>
    {children}
  </Root>
)

Ul.defaultProps = {
  color: 'text'
}

export default Ul

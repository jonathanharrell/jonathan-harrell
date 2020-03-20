import React from 'react'
import styled from 'styled-components'

const Root = styled.span`
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  background-color: var(--backgroundSecondary);
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme }) => theme.fontSizes.s.mobile};
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--textLighter);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.s.tablet};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.s.desktop};
  }

  &:hover,
  &:focus {
    background-color: var(--backgroundTertiary);
  }
`

const Tag = ({ children, ...props }) => (
  <Root {...props}>
    {children}
  </Root>
)

export default Tag

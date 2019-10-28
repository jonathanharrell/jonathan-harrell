import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../themes'

const Code = styled.code`
  padding: 0.125rem 0.25rem;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  font-size: 1.125rem;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 1.25rem;
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: 1.375rem;
  }
`

const InlineCode = ({ children, ...props }) => (
  <Code {...props}>
    {children}
  </Code>
)

export default InlineCode

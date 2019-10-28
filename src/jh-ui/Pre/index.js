import React from 'react'
import styled from 'styled-components'

const StyledPre = styled.pre`
  padding: ${({ theme }) => theme.spacing.m} 0;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`

const Pre = ({ children, ...props }) => (
  <StyledPre {...props}>
    {children}
  </StyledPre>
)

export default Pre

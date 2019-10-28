import React from 'react'
import styled from 'styled-components'

const StyledPre = styled.pre`
  margin: ${({ theme }) => theme.spacing.xl} -${({ theme }) => theme.spacing.l};
  padding: ${({ theme }) => theme.spacing.m} ${({ theme }) => theme.spacing.l};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  white-space: pre-wrap;
  
  code {
    line-height: 1.4;
  }
`

const Pre = ({ children, ...props }) => (
  <StyledPre {...props}>
    {children}
  </StyledPre>
)

export default Pre

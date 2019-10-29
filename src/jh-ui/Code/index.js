import React from 'react'
import styled from 'styled-components'

const StyledCode = styled.code`
  font-family: Menlo, Monaco, Consolas, Courier New, monospace;
  font-size: 90%;
`

const Code = ({ children, ...props }) => (
  <StyledCode {...props}>
    {children}
  </StyledCode>
)

export default Code

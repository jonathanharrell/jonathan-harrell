import React from 'react'
import styled from 'styled-components'

const Code = styled.code`
  padding: 0.125rem 0.25rem;
  border-radius: 2px;
  background-color: var(--backgroundSecondary);
  font-family: Menlo, Monaco, Consolas, Courier New, monospace;
  font-size: 0.95rem;
`

const InlineCode = ({ children, ...props }) => (
  <Code {...props}>
    {children}
  </Code>
)

export default InlineCode

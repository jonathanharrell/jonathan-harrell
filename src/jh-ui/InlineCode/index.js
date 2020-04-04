import React from 'react'
import { Code } from './styles'

const InlineCode = ({ children, ...props }) => (
  <Code {...props}>{children}</Code>
)

export default InlineCode

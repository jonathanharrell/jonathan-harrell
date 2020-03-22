import React from 'react'
import { Root } from './styles'

const Ol = ({ children, ...props }) => (
  <Root {...props}>
    {children}
  </Root>
)

export default Ol

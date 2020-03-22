import React from 'react'
import { Root } from './styles'

const Input = React.forwardRef(({ children, ...props }, ref) => (
  <Root ref={ref} {...props}>
    {children}
  </Root>
))

export default Input

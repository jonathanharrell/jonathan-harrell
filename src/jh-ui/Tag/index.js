import React from 'react'
import { Root } from './styles'

const Tag = ({ children, ...props }) => <Root {...props}>{children}</Root>

export default Tag

import React from 'react'
import Root from './src/components/Root/'

export const wrapRootElement = ({ element }) => (
  <Root className="test">{element}</Root>
)

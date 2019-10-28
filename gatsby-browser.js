import React from 'react'
import './src/prism-jh.css'
import Root from './src/components/Root'

export const wrapRootElement = ({ element }) => {
  return (
    <Root className="test">{element}</Root>
  )
}

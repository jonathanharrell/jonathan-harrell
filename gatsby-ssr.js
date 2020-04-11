import React from 'react'
import Root from './src/components/Root/'
import Layout from './src/components/Layout'

export const wrapRootElement = ({ element }) => (
  <Root className="test">{element}</Root>
)

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

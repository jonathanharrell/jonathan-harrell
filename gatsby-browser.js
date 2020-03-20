import React from 'react'
import * as Sentry from '@sentry/browser'
import Root from './src/components/Root'

export const wrapRootElement = ({ element }) => {
  return (
    <Root>{element}</Root>
  )
}

export const onClientEntry = () => {
  Sentry.init({ dsn: process.env.SENTRY_DSN_URL })
  window.Sentry = Sentry
}

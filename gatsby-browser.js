import React from 'react'
import * as Sentry from '@sentry/browser'
import Root from './src/components/Root/'

export const wrapRootElement = ({ element }) => (
  <Root>{element}</Root>
)

export const onClientEntry = () => {
  Sentry.init({ dsn: process.env.GATSBY_SENTRY_DSN_URL })
  window.Sentry = Sentry
}

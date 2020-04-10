import React from 'react'
import * as Sentry from '@sentry/browser'
import Root from './src/components/Root/'
import config from './package.json'

export const wrapRootElement = ({ element }) => <Root>{element}</Root>

export const onClientEntry = () => {
  Sentry.init({
    dsn: process.env.GATSBY_SENTRY_DSN_URL,
    release: config.version
  })
  window.Sentry = Sentry
}

export const onRouteUpdate = ({ prevLocation }) => {
  if (prevLocation) {
    const navSkipLink = document.getElementById('nav-skip-link')
    if (navSkipLink) {
      setTimeout(() => {
        navSkipLink.focus()
      }, 0)
    }

    // make sure aria-hidden is removed due to overlay
    const gatsbyWrap = document.getElementById('___gatsby')
    gatsbyWrap.removeAttribute('aria-hidden')
  }
}

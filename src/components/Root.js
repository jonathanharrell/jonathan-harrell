import React, { useEffect, useState } from 'react'
import ThemeContext from '../context/theme'
import theme from '../jh-ui/theme'
import ErrorBoundary from './ErrorBoundary'
import { addAlert } from '../helpers'
import * as Sentry from '@sentry/browser'

const Root = ({ children }) => {
  const [themeName, setThemeName] = useState()

  useEffect(() => {
    setThemeName(window.__theme)

    window.addEventListener('themeChange', event => {
      setThemeName(event.detail)
    })
  }, [])

  const setTheme = themeName => {
    window.__setPreferredTheme(themeName)
    addAlert(`Theme set to ${themeName}`)
  }
  Sentry.captureException(new Error('test error'))
  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </ThemeContext.Provider>
  )
}

export default Root

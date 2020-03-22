import React, { useEffect, useState } from 'react'
import ErrorBoundary from '../ErrorBoundary'
import theme from '../../jh-ui/theme'
import ThemeContext from '../../context/theme'
import { addAlert } from '../../helpers'

const Root = ({ children }) => {
  const [themeName, setThemeName] = useState()

  useEffect(() => {
    // set initial theme based on value set on window
    setThemeName(window.__theme)

    // set up listener for custom theme change event
    window.addEventListener('themeChange', event => {
      setThemeName(event.detail)
    })
  }, [])

  // allow user to manually change their theme
  const setTheme = themeName => {
    window.__setPreferredTheme(themeName)
    addAlert(`Theme set to ${themeName}`)
  }

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </ThemeContext.Provider>
  )
}

export default Root

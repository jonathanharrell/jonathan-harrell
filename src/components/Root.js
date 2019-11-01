import React from 'react'
import ThemeContext from '../context/theme'
import theme from '../jh-ui/theme'
import { addAlert } from '../helpers'

const Root = ({ children }) => {
  const toggleTheme = () => {
    const newThemeName = window.__theme === 'light' ? 'dark' : 'light'
    window.__setPreferredTheme(newThemeName)
    addAlert(`Theme set to ${newThemeName}`)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default Root

import React from 'react'
import ThemeContext from '../context/theme'
import theme from '../jh-ui/theme'

const Root = ({ children }) => {
  const toggleTheme = () => {
    window.__setPreferredTheme(window.__theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default Root

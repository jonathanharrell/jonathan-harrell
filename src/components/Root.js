import React, { useState } from 'react'
import themes from '../jh-ui/themes'
import ThemeContext from '../context/theme'

const Root = ({ children }) => {
  let defaultTheme = themes.light

  const darkModeMediaQuery = window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

  // if system has dark theme, set theme to dark
  if (darkModeMediaQuery && darkModeMediaQuery.matches) {
    defaultTheme = themes.dark
  }

  // look if there is a saved theme
  const savedTheme = sessionStorage.getItem('jh-theme')

  // if saved theme, set theme to that
  // otherwise, save the current theme
  if (savedTheme) {
    defaultTheme = themes[savedTheme]
  } else {
    sessionStorage.setItem('jh-theme', defaultTheme === themes.light ? 'light' : 'dark')
  }

  const [theme, setTheme] = useState(defaultTheme)

  const toggleTheme = () => {
    // set and store newly toggled theme
    const newThemeName = theme === themes.light ? 'dark' : 'light'
    setTheme(themes[newThemeName])
    sessionStorage.setItem('jh-theme', newThemeName)
  }

  darkModeMediaQuery.addListener(() => {
    // set and store newly changed system theme
    const newThemeName = darkModeMediaQuery.matches ? 'dark' : 'light'
    setTheme(themes[newThemeName])
    sessionStorage.setItem('jh-theme', newThemeName)
  })

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default Root

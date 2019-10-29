import React, { useLayoutEffect, useState } from 'react'
import themes from '../jh-ui/themes'
import ThemeContext from '../context/theme'

const Root = ({ children }) => {
  const [theme, setTheme] = useState(themes.light)

  useLayoutEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // if system has dark theme, set theme to dark
    if (window.matchMedia && darkModeMediaQuery.matches) {
      setTheme(themes.dark)
    }

    // look if there is a saved theme
    const savedTheme = sessionStorage.getItem('jh-theme')

    // if saved theme, set theme to that
    if (savedTheme) {
      setTheme(themes[savedTheme])
    }

    darkModeMediaQuery.addListener(() => {
      // set and store newly changed system theme
      const newThemeName = darkModeMediaQuery.matches ? 'dark' : 'light'
      setTheme(themes[newThemeName])
      sessionStorage.setItem('jh-theme', newThemeName)
    })
  }, [theme])

  const toggleTheme = () => {
    // set and store newly toggled theme
    const newThemeName = theme === themes.light ? 'dark' : 'light'
    setTheme(themes[newThemeName])
    sessionStorage.setItem('jh-theme', newThemeName)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default Root

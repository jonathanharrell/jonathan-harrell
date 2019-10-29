import React, { useLayoutEffect, useState } from 'react'
import themes from '../jh-ui/themes'
import ThemeContext from '../context/theme'

const Root = ({ children }) => {
  const defaultTheme = typeof document !== 'undefined' && document.body.dataset.theme
  const [theme, setTheme] = useState(defaultTheme ? themes[defaultTheme] : themes.light)

  useLayoutEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

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
  console.log(theme)
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default Root

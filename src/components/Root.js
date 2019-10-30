import React, { useEffect, useState } from 'react'
import ThemeContext from '../context/theme'
import theme from '../jh-ui/theme'

const Root = ({ children }) => {
  const [themeName, setTheme] = useState('light')

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    let defaultThemeName

    // if system has dark theme, set theme to dark
    if (window.matchMedia && darkModeMediaQuery.matches) {
      defaultThemeName = 'dark'
    }

    // look if there is a saved theme
    const savedThemeName = sessionStorage.getItem('jh-theme')

    // if saved theme, set theme to that
    if (savedThemeName) {
      defaultThemeName = savedThemeName
    }

    setTheme(defaultThemeName)
    //sessionStorage.setItem('jh-theme', defaultThemeName)

    darkModeMediaQuery.addListener(() => {
      // set and store newly changed system theme
      const newThemeName = darkModeMediaQuery.matches ? 'dark' : 'light'
      setTheme(newThemeName)
      sessionStorage.setItem('jh-theme', newThemeName)
    })
  }, [themeName])

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark')
    document.body.classList.add(`theme-${themeName}`)
  })

  const toggleTheme = () => {
    // set and store newly toggled theme
    const newThemeName = themeName === 'light' ? 'dark' : 'light'
    setTheme(newThemeName)
    sessionStorage.setItem('jh-theme', newThemeName)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default Root
